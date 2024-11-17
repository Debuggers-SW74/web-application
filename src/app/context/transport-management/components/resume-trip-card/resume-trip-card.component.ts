import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TripService } from '@shared/services/trip/trip.service';
import { Trip } from '@shared/models/entities/Trip';
import { ThresholdService } from '@app/context/alerts-system/services/threshold/threshold.service';
import { TruncateWordsPipe } from '@app/shared/pipes/truncate-words/truncate-words.pipe';

@Component({
  selector: 'app-resume-trip-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, TruncateWordsPipe],
  providers: [TripService, ThresholdService],
  templateUrl: './resume-trip-card.component.html',
  styleUrl: './resume-trip-card.component.css',
})
export class ResumeTripCardComponent {
  @Input() trip!: Trip;
  @Input() action!: boolean;

  constructor(
    private tripService: TripService,
    private thresholdService: ThresholdService
  ) {}

  startTrip() {
    console.log(this.trip);
    this.tripService.startTrip(this.trip.tripId).subscribe({
      next: (response) => {
        console.log(response);
        this.thresholdService
          .createDefaultThresholds(this.trip.tripId, this.trip.supervisorId)
          .then(() => {
            alert('Trip started and default thresholds created');
          })
          .catch((error) => {
            console.error('Error creating default thresholds', error);
            alert(
              'Trip started but there was an error creating default thresholds'
            );
          });
      },
      error: (error) => {
        console.error(error);
        alert('Error starting trip');
      },
    });
  }

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
