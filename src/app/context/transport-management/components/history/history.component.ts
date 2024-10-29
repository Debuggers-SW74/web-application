import { Component } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { TripStatus } from '@shared/models/enum/trip-status';
import { ResumeTripCardComponent } from '../resume-trip-card/resume-trip-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ResumeTripCardComponent, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  historyTrips: Trip[] = [
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
