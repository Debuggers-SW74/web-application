import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TripService } from '@shared/services/trip/trip.service';
import { Trip } from '@shared/models/entities/Trip';

@Component({
  selector: 'app-resume-trip-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  providers: [TripService],
  templateUrl: './resume-trip-card.component.html',
  styleUrl: './resume-trip-card.component.css',
})
export class ResumeTripCardComponent {
  @Input() trip!: Trip;
  @Input() action!: boolean;

  constructor(private tripService: TripService) {}

  finishTrip() {
    console.log(this.trip);
    this.tripService.finishTrip(this.trip.tripId).subscribe({
      next: (response) => {
        console.log(response);
        alert('Trip finished');
      },
      error: (error) => {
        console.error(error);
        alert('Error finishing trip');
      },
    });
  }

  cancelTrip() {
    this.tripService.finishTrip(this.trip.tripId).subscribe({
      next: (response) => {
        console.log(response);
        alert('Trip finished');
      },
      error: (error) => {
        console.error(error);
        alert('Error finishing trip');
      },
    });
  }
}
