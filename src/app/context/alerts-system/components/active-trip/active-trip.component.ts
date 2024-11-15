import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Alert } from '@shared/models/entities/Alert';
import { Trip } from '@shared/models/entities/Trip';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-active-trip',
  standalone: true,
  imports: [CommonModule, MatButtonModule, BaseChartDirective],
  providers: [AlertsService],
  templateUrl: './active-trip.component.html',
  styleUrl: './active-trip.component.css',
})
export class ActiveTripComponent implements OnInit {
  @Input() activeTrip: Trip | undefined;
  @Input() showAction: boolean = false;
  alertToSend: Alert | undefined;

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
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
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [
          15, 16, 17, 18, 19, 21, 23, 25, 27, 29, 30, 31, 32, 31, 30, 29, 27,
          26, 24, 22, 20, 19, 18, 16,
        ],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Humedad (%)',
        data: [
          40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 95, 90, 85, 80, 75,
          70, 65, 60, 55, 50, 45, 40,
        ],
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
        title: {
          display: true,
          text: 'Temperatura (°C)',
        },
      },
      y2: {
        type: 'category',
        labels: [
          '0%',
          '10%',
          '20%',
          '30%',
          '40%',
          '50%',
          '60%',
          '70%',
          '80%',
          '90%',
          '100%',
        ],
        position: 'right',
        title: {
          display: true,
          text: 'Humedad (%)',
        },
      },
      x: {
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
        data: [350],
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
