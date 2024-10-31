import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Trip } from '@shared/models/entities/Trip';

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
