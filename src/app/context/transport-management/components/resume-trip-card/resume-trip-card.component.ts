import { Component, Input } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { TripStatus } from '@shared/models/enum/trip-status';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-resume-trip-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './resume-trip-card.component.html',
  styleUrl: './resume-trip-card.component.css',
})
export class ResumeTripCardComponent {
  @Input() trip!: Trip;
  @Input() action!: boolean;
}
