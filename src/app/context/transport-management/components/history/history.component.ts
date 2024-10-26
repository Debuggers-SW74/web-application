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
      supervisorId: 1,
      from: 'Santiago',
      to: 'Lima',
      type: 'GNV',
      amount: 10,
      weight: 100,
      date: new Date(),
      departureTime: '10:00',
      arrivalTime: '13:00',
      subject: 'Test',
      description: 'Test',
      status: TripStatus.Pending,
    },
  ];
}
