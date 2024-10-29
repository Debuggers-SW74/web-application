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
      driverName: 'Juan',
      driverPhone: '123456789',
      supervisorId: 1,
      supervisorName: 'Carlos',
      supervisorPhone: '987654321',
      origin: 'Ubicación inicial',
      destination: 'Ubicación final',
      type: 'GNV',
      amount: 230,
      weight: 1000,
      date: new Date(),
      startTime: '10:00',
      endTime: '12:00',
      subject: '',
      description: '',
      status: TripStatus.Completed,
    },
  ];
}
