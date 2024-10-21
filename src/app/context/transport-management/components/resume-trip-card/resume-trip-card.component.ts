import { Component, Input } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { TripStatus } from '@shared/models/enum/trip-status';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-trip-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './resume-trip-card.component.html',
  styleUrl: './resume-trip-card.component.css',
})
export class ResumeTripCardComponent {
  @Input() trip!: Trip;
  @Input() action!: boolean;

  finishTrip() {
    console.log('Finish trip');
  }

  cancelTrip() {
    console.log('Cancel trip');
  }
}
