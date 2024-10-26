import { Component } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { TripStatus } from '@shared/models/enum/trip-status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent {
  trips: Trip[] = [
    {
      id: 1,
      driverId: 1,
      supervisorId: 1,
      from: 'Ubicación inicial',
      to: 'Ubicación final',
      type: 'GNV',
      amount: 230,
      weight: 1000,
      date: new Date(),
      departureTime: '10:00',
      arrivalTime: '12:00',
      subject: '',
      description: '',
      status: TripStatus.Completed,
    },
  ];
}
