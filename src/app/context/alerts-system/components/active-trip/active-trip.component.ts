import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  thresholdInfo = {
    gas: {
      min: 0,
      max: 0,
    },
    temperature: {
      min: 0,
      max: 0,
    },
    pressure: {
      min: 0,
      max: 0,
    },
    humidity: {
      min: 0,
      max: 0,
    },
  };
  sensorData: SensorData[] = [];
  allowUpdate = false;
  private intervalId: any;
  sensorType = '';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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

        switch (this.sensorType) {
          case 'SENSOR_GAS':
            this.thresholdInfo.gas.min = this.sensorForm.value.minThreshold;
            this.thresholdInfo.gas.max = this.sensorForm.value.maxThreshold;
            break;
          case 'SENSOR_TEMPERATURE':
            this.thresholdInfo.temperature.min =
              this.sensorForm.value.minThreshold;
            this.thresholdInfo.temperature.max =
              this.sensorForm.value.maxThreshold;
            break;
          case 'SENSOR_PRESSURE':
            this.thresholdInfo.pressure.min =
              this.sensorForm.value.minThreshold;
            this.thresholdInfo.pressure.max =
              this.sensorForm.value.maxThreshold;
            break;
          case 'SENSOR_HUMIDITY':
            this.thresholdInfo.humidity.min =
              this.sensorForm.value.minThreshold;
            this.thresholdInfo.humidity.max =
              this.sensorForm.value.maxThreshold;
            break;
        }
      },
      error: (error) => {
        console.error('Error updating threshold', error);
      },
    });
  }

  ngOnInit(): void {
    this.allowUpdate =
      this.authService.getUserTypeFromToken() === 'ROLE_SUPERVISOR';

    if (!this.allowUpdate) {
      this.getAlerts();
      this.intervalId = setInterval(() => this.getAlerts(), 30000);
    }

    this.thresholdService
      .getByTripId(this.activeTrip?.tripId as number)
      .subscribe({
        next: (thresholds: Threshold[]) => {
          if (thresholds && thresholds.length > 0) {
            this.thresholdInformation = thresholds;
            thresholds.map((threshold) => {
              switch (threshold.sensorType) {
                case 'SENSOR_GAS':
                  this.thresholdInfo.gas.min = threshold.minThreshold;
                  this.thresholdInfo.gas.max = threshold.maxThreshold;
                  break;
                case 'SENSOR_TEMPERATURE':
                  this.thresholdInfo.temperature.min = threshold.minThreshold;
                  this.thresholdInfo.temperature.max = threshold.maxThreshold;
                  break;
                case 'SENSOR_PRESSURE':
                  this.thresholdInfo.pressure.min = threshold.minThreshold;
                  this.thresholdInfo.pressure.max = threshold.maxThreshold;
                  break;
                case 'SENSOR_HUMIDITY':
                  this.thresholdInfo.humidity.min = threshold.minThreshold;
                  this.thresholdInfo.humidity.max = threshold.maxThreshold;
                  break;
              }
            });
          } else {
            console.log('No hay thresholds');
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

  getAlerts() {
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
            // alert('No hay datos de sensor disponibles');
            console.log('No hay datos de sensor disponibles');
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos del sensor', error);
        },
      });
  }

  updateChartData() {
    if (this.sensorData && this.sensorData.length > 0) {
      console.log('Actualizando datos del gráfico');
      // Obtener los timestamps para el eje X
      const timestamps = this.sensorData
        .filter((data) => data !== undefined)
        .map((data) =>
          new Date(data.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        ); // Formato "hh:mm"

      // Actualizar las etiquetas (labels) del eje X
      this.lineChartData.labels = [
        ...(this.lineChartData.labels || []), // Si no hay etiquetas, inicia con un arreglo vacío
        ...timestamps,
      ].slice(-10); // Limitar a las últimas 10 etiquetas

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

      // Actualizar el gráfico de burbuja
      this.updateBubbleChartData();

      // Notificar al gráfico que se actualizaron los datos
      this.chart?.update();
    } else {
      console.log('No hay datos de sensor disponibles');
    }
  }

  updateBubbleChartData() {
    if (this.sensorData && this.sensorData.length > 0) {
      const latestSensor = this.sensorData[this.sensorData.length - 1];
      const gasValue = latestSensor.gasValue;

      // Asegúrate de que gasValue es válido
      console.log('Gas Value:', gasValue);

      // Usar gasValue directamente como el radio
      this.bubbleChartData.datasets[0].data[0].r = gasValue;

      // Ajustar las escalas para que se acomoden al valor de gasValue
      const maxScale = Math.max(gasValue * 2, 100); // Escala doble del gasValue o mínimo de 100
      this.bubbleChartOptions.scales!['x']!.max = maxScale;
      this.bubbleChartOptions.scales!['y']!.max = maxScale;

      this.chart?.update();
    }
  }

  onSensorChange(event: any) {
    this.sensorForm.patchValue({
      safetyThresholdId: event.value.id,
    });
    this.sensorType = event.value.sensorMap;

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
    if (this.sensorType === '') {
      alert('Seleccione un sensor');
      return;
    }

    const latestSensorData = this.sensorData[this.sensorData.length - 1];

    if (this.sensorType === 'SENSOR_GAS') {
      this.alertToSend = {
        sensorType: this.sensorType,
        value: latestSensorData.gasValue,
        timestamp: new Date().toISOString(),
        tripId: this.activeTrip?.tripId as number,
      };
    } else if (this.sensorType === 'SENSOR_TEMPERATURE') {
      this.alertToSend = {
        sensorType: this.sensorType,
        value: latestSensorData.temperatureValue,
        timestamp: new Date().toISOString(),
        tripId: this.activeTrip?.tripId as number,
      };
    } else if (this.sensorType === 'SENSOR_PRESSURE') {
      this.alertToSend = {
        sensorType: this.sensorType,
        value: latestSensorData.pressureValue,
        timestamp: new Date().toISOString(),
        tripId: this.activeTrip?.tripId as number,
      };
    } else if (this.sensorType === 'SENSOR_HUMIDITY') {
      this.alertToSend = {
        sensorType: this.sensorType,
        value: latestSensorData.humidityValue,
        timestamp: new Date().toISOString(),
        tripId: this.activeTrip?.tripId as number,
      };
    }

    this.alertsService.create(this.alertToSend!).subscribe({
      next: () => {
        console.log('Alerta enviada');
      },
      error: (error) => {
        console.error('Error al enviar la alerta', error);
        alert('Error al enviar la alerta');
      },
    });

    // this.thresholdInformation.forEach((threshold) => {
    //   let alertToSend: Alert | undefined;

    //   switch (threshold.sensorType) {
    //     case 'SENSOR_GAS':
    //       if (
    //         latestSensorData.gasValue > threshold.maxThreshold ||
    //         latestSensorData.gasValue < threshold.minThreshold
    //       ) {
    //         alertToSend = {
    //           sensorType: 'SENSOR_GAS',
    //           value: latestSensorData.gasValue,
    //           timestamp: new Date().toISOString(),
    //           tripId: this.activeTrip?.tripId as number,
    //         };
    //       }
    //       break;
    //     case 'SENSOR_TEMPERATURE':
    //       if (
    //         latestSensorData.temperatureValue > threshold.maxThreshold ||
    //         latestSensorData.temperatureValue < threshold.minThreshold
    //       ) {
    //         alertToSend = {
    //           sensorType: 'SENSOR_TEMPERATURE',
    //           value: latestSensorData.temperatureValue,
    //           timestamp: new Date().toISOString(),
    //           tripId: this.activeTrip?.tripId as number,
    //         };
    //       }
    //       break;
    //     case 'SENSOR_PRESSURE':
    //       if (
    //         latestSensorData.pressureValue > threshold.maxThreshold ||
    //         latestSensorData.pressureValue < threshold.minThreshold
    //       ) {
    //         alertToSend = {
    //           sensorType: 'SENSOR_PRESSURE',
    //           value: latestSensorData.pressureValue,
    //           timestamp: new Date().toISOString(),
    //           tripId: this.activeTrip?.tripId as number,
    //         };
    //       }
    //       break;
    //     case 'SENSOR_HUMIDITY':
    //       if (
    //         latestSensorData.humidityValue > threshold.maxThreshold ||
    //         latestSensorData.humidityValue < threshold.minThreshold
    //       ) {
    //         alertToSend = {
    //           sensorType: 'SENSOR_HUMIDITY',
    //           value: latestSensorData.humidityValue,
    //           timestamp: new Date().toISOString(),
    //           tripId: this.activeTrip?.tripId as number,
    //         };
    //       }
    //       break;
    //   }

    //   if (alertToSend) {
    //     this.alertToSend = alertToSend;
    //     this.alertsService.create(this.alertToSend).subscribe({
    //       next: () => {
    //         console.log('Alerta enviada');
    //       },
    //       error: (error) => {
    //         console.error('Error al enviar la alerta', error);
    //       },
    //     });
    //   }
    // });
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

  public bubbleChartData: ChartData<'bubble'> = {
    datasets: [
      {
        label: 'Nivel de Gas',
        data: [
          {
            x: 50, // Coordenada X fija para centrar
            y: 50, // Coordenada Y fija para centrar
            r: 20, // Radio inicial de la burbuja
          },
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color de la burbuja
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)', // Color al pasar el mouse
      },
    ],
  };

  public bubbleChartOptions: ChartOptions<'bubble'> = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100, // Fija el eje X para centrar la burbuja
        display: false, // Oculta el eje X
      },
      y: {
        min: 0,
        max: 100, // Fija el eje Y para centrar la burbuja
        display: false, // Oculta el eje Y
      },
    },
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const raw = context.raw as { x: number; y: number; r: number }; // Define el tipo esperado
            return `Nivel de Gas: ${raw.r}`;
          },
        },
      },
    },
  };
}
