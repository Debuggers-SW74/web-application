import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TripStatusService } from '@shared/services/trip-status/trip-status.service';
import { TripService } from '@shared/services/trip/trip.service';
import { Trip } from '@shared/models/entities/Trip';
import { AuthService } from '@shared/services/auth/auth.service';
import { TruncateWordsPipe } from '@shared/pipes/truncate-words/truncate-words.pipe';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, TruncateWordsPipe],
  providers: [TripStatusService],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripStatusService: TripStatusService,
    private tripService: TripService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    this.tripStatusService.getTripStatus().subscribe((tripStatusMap) => {
      const finishedId = tripStatusMap.get('FINISHED') as number;

      if (userType === 'ROLE_SUPERVISOR') {
        this.tripService
          .getTripsBySupervisorIdAndStatus(userId as number, finishedId)
          .subscribe({
            next: (response: Trip[]) => {
              console.log('Trips obtenidos:', response);
              if (response) this.trips = response.slice(0, 2);
            },
            error: (err) => {
              console.error('Error fetching trips data:', err);
              this.trips = [];
            },
          });
      } else {
        this.tripService
          .getTripsByDriverIdAndStatus(userId as number, finishedId)
          .subscribe({
            next: (response: Trip[]) => {
              console.log('Trips obtenidos:', response);
              if (response) this.trips = response.slice(0, 2);
            },
            error: (err) => {
              console.error('Error fetching trips data:', err);
              this.trips = [];
            },
          });
      }
    });
  }
}
