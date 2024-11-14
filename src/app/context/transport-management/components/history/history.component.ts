import { Component } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { ResumeTripCardComponent } from '../resume-trip-card/resume-trip-card.component';
import { CommonModule } from '@angular/common';
import { TripService } from '@shared/services/trip/trip.service';
import { TripStatusService } from '@shared/services/trip-status/trip-status.service';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ResumeTripCardComponent, CommonModule],
  providers: [TripService],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  historyTrips: Trip[] = [];

  constructor(
    private authService: AuthService,
    private tripService: TripService,
    private tripStatusService: TripStatusService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    this.tripStatusService.getTripStatus().subscribe((tripStatusMap) => {
      const finishedId = tripStatusMap.get('FINISHED') as number;

      if (userType === 'ROLE_SUPERVISOR') {
        this.tripService
          .getTripsBySupervisorIdAndStatus(userId as number, finishedId)
          .subscribe((trips: Trip[]) => {
            if (this.historyTrips) this.historyTrips = trips;
          });
      } else {
        this.tripService
          .getTripsByDriverIdAndStatus(userId as number, finishedId)
          .subscribe((trips: Trip[]) => {
            if (this.historyTrips) this.historyTrips = trips;
          });
      }
    });
  }
}
