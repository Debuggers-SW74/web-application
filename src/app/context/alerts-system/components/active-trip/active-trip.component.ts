import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-active-trip',
  standalone: true,
  imports: [MatButtonModule, BaseChartDirective],
  templateUrl: './active-trip.component.html',
  styleUrl: './active-trip.component.css'
})
export class ActiveTripComponent {
  driver = {
    name: 'Driver 1',
    from: 'Ubicación inicial',
    to: "Ubicación final",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg",
    phone: "987654321"
  }

  public lineChartData: ChartData<'line'> = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Etiquetas para las 24 horas del día
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [15, 16, 17, 18, 19, 21, 23, 25, 27, 29, 30, 31, 32, 31, 30, 29, 27, 26, 24, 22, 20, 19, 18, 16],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Humedad (%)',
        data: [40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40],
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
        labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
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
    labels: [' '], // Etiqueta vacía para representar un solo valor
    datasets: [
      {
        label: 'GNV',
        data: [350], // Puedes reemplazar esto con un valor de presión de gas
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      }
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
