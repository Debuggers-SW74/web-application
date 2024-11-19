import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Alert } from '@shared/models/entities/Alert';
import { SensorData } from '@shared/models/entities/SensorData';
import { Threshold } from '@shared/models/entities/threshold';
import { Trip } from '@shared/models/entities/Trip';
import { AuthService } from '@shared/services/auth/auth.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AlertsService } from '../../services/alerts/alerts.service';
import { SensorDataService } from '../../services/sensor-data/sensor-data/sensor-data.service';
import { ThresholdService } from '../../services/threshold/threshold.service';

@Component({
  selector: 'app-active-trip',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BaseChartDirective,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [AlertsService, ThresholdService, AuthService, SensorDataService],
  templateUrl: './active-trip.component.html',
  styleUrl: './active-trip.component.css',
})
export class ActiveTripComponent implements OnInit, OnDestroy {
  @Input() activeTrip: Trip | undefined;
  @Input() showAction: boolean = false;
  alertToSend: Alert | undefined;
  thresholdInformation: Threshold[] = [];
  sensorData: SensorData[] = [];
  allowUpdate = false;
  private intervalId: any;

  sensorForm!: FormGroup;

  constructor(
    private alertsService: AlertsService,
    private thresholdService: ThresholdService,
    private authService: AuthService,
    private sensorDataService: SensorDataService,
    private formBuilder: FormBuilder
  ) {
    this.sensorForm = this.formBuilder.group({
      minThreshold: ['', Validators.required],
      maxThreshold: ['', Validators.required],
      safetyThresholdId: ['', Validators.required],
    });
  }

  sensors = [
    {
      sensorType: 'Gas Leak',
      sensorMap: 'SENSOR_GAS',
      id: 1,
    },
    {
      sensorType: 'Temperature',
      sensorMap: 'SENSOR_TEMPERATURE',
      id: 2,
    },
    {
      sensorType: 'Presure',
      sensorMap: 'SENSOR_PRESSURE',
      id: 3,
    },
    {
      sensorType: 'Humidity',
      sensorMap: 'SENSOR_HUMIDITY',
      id: 4,
    },
  ];

  submit() {
    this.thresholdService.update(this.sensorForm.value).subscribe({
      next: () => {
        console.log('Threshold updated');
      },
      error: (error) => {
        console.error('Error updating threshold', error);
      },
    });
  }

  ngOnInit(): void {
    this.allowUpdate =
      this.authService.getUserTypeFromToken() === 'ROLE_SUPERVISOR';

    this.alertsService
      .getByTripId(this.activeTrip?.tripId as number)
      .subscribe({
        next: (alerts: Alert[]) => {
          if (alerts && alerts.length > 0) {
            alerts.map((alertReceive) => {
              console.log('Alerta recibida', alertReceive);
              alert('Alerta recibida');
            });
          } else {
            console.log('No hay alertas');
          }
        },
        error: (error) => {
          console.error('Error al obtener las alertas', error);
        },
      });

    this.thresholdService
      .getByTripId(this.activeTrip?.tripId as number)
      .subscribe({
        next: (thresholds: Threshold[]) => {
          if (thresholds && thresholds.length > 0) {
            thresholds.map((threshold) => {
              console.log('Threshold obtenido', threshold);
            });
          }
        },
        error: (error) => {
          console.error('Error al obtener los thresholds', error);
        },
      });

    this.getSensorData();
    this.intervalId = setInterval(() => this.getSensorData(), 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getSensorData() {
    this.sensorDataService
      .getByTripId(this.activeTrip?.tripId as number)
      .subscribe({
        next: (sensorData) => {
          if (sensorData && sensorData.length > 0) {
            sensorData.map((data) => {
              console.log('Datos obtenidos', data);
            });

            this.sensorData = sensorData;
            this.updateChartData();
          } else {
            alert('No hay datos de sensor disponibles');
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos del sensor', error);
        },
      });
  }
  updateChartData() {
    if (this.sensorData && this.sensorData.length > 0) {
      // Obtener los timestamps para el eje X
      const timestamps = this.sensorData
        .filter((data) => data !== undefined)
        .map((data) =>
          new Date(data.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        ); // Formato "hh:mm"

      // Actualizar los datos del eje Y (temperatura)
      this.lineChartData.datasets[0].data = [
        ...this.lineChartData.datasets[0].data,
        ...this.sensorData
          .filter((data) => data !== undefined)
          .map((data) => data.temperatureValue),
      ].slice(-10);

      // Actualizar los datos del eje Y (humedad)
      this.lineChartData.datasets[1].data = [
        ...this.lineChartData.datasets[1].data,
        ...this.sensorData
          .filter((data) => data !== undefined)
          .map((data) => data.humidityValue),
      ].slice(-10);

      // Actualizar las etiquetas (labels) del eje X
      if (this.lineChartData.labels) {
        this.lineChartData.labels = [
          ...this.lineChartData.labels,
          ...timestamps,
        ].slice(-10);
      } else {
        this.lineChartData.labels = timestamps.slice(-10); // Si no hay etiquetas existentes
      }

      // Actualizar los datos del gráfico de barras (solo el último valor de gas)
      this.barChartData.datasets[0].data = [
        this.sensorData[this.sensorData.length - 1].gasValue,
      ];
    } else {
      console.log('No hay datos de sensor disponibles');
    }
  }

  onSensorChange(event: any) {
    this.sensorForm.patchValue({
      safetyThresholdId: event.value.id,
    });

    this.thresholdService
      .getByTripId(this.activeTrip?.tripId as number)
      .subscribe({
        next: (thresholds: Threshold[]) => {
          if (thresholds && thresholds.length > 0) {
            this.thresholdInformation = thresholds.filter(
              (threshold) => threshold.sensorType === event.value.sensorMap
            );
            this.sensorForm.patchValue({
              minThreshold: this.thresholdInformation[0].minThreshold,
              maxThreshold: this.thresholdInformation[0].maxThreshold,
            });
          } else {
            console.log('No hay thresholds');
          }
        },
        error: (error) => {
          console.error('Error al obtener los thresholds', error);
        },
      });
  }

  onSendAlert() {
    this.alertToSend = {
      sensorType: 'string',
      value: 20,
      timestamp: new Date().toISOString(),
      tripId: this.activeTrip?.tripId as number,
    };

    this.alertsService.create(this.alertToSend as Alert).subscribe({
      next: () => {
        console.log('Alerta enviada');
      },
      error: (error) => {
        console.error('Error al enviar la alerta', error);
      },
    });
  }

  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Humedad (%)',
        data: [],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        stepped: true,
        yAxisID: 'y2',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        min: 0, // Valor mínimo del eje
        max: 100, // Valor máximo del eje
        position: 'left',
        title: {
          display: true,
          text: 'Temperatura (°C)',
        },
      },
      y2: {
        labels: Array.from({ length: 10 }, (_, i) => `${i}0%`),
        min: 0,
        max: 100,
        position: 'right',
        title: {
          display: true,
          text: 'Humedad (%)',
        },
        ticks: {
          callback: (value) => `${value}%`, // Agregar símbolo de porcentaje
        },
      },
      x: {
        labels: Array.from({ length: 10 }, (_, i) => `${9 + i}:00`), // Horas de 9:00 a 18:00
        title: {
          display: true,
          text: 'Hora del día',
        },
      },
    },
  };

  public lineChartType: ChartConfiguration<'line'>['type'] = 'line';

  public barChartData: ChartData<'bar'> = {
    labels: [' '],
    datasets: [
      {
        label: 'GNV',
        data: [],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Presión de Gas (GNV)',
      },
    },
  };

  public barChartType: ChartConfiguration<'bar'>['type'] = 'bar';
}
