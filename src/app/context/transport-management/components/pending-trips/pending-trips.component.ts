import { Component, OnInit } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { ResumeTripCardComponent } from '../resume-trip-card/resume-trip-card.component';
import { CommonModule } from '@angular/common';
import { TripService } from '@shared/services/trip/trip.service';
import { TripStatusService } from '@shared/services/trip-status/trip-status.service';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-pending-trips',
  standalone: true,
  imports: [ResumeTripCardComponent, CommonModule],
  providers: [TripService],
  templateUrl: './pending-trips.component.html',
  styleUrl: './pending-trips.component.css',
})
export class PendingTripsComponent implements OnInit {
  pendingTrips: Trip[] = [];
  haveActions: boolean = false;

  constructor(
    private authService: AuthService,
    private tripService: TripService,
    private tripStatusService: TripStatusService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    if (userType === 'ROLE_SUPERVISOR') {
      this.haveActions = true;
    }

    this.tripStatusService.getTripStatus().subscribe((tripStatusMap) => {
      const pendingId = tripStatusMap.get('PENDING') as number;

      if (userType === 'ROLE_SUPERVISOR') {
        this.tripService
          .getTripsBySupervisorIdAndStatus(userId as number, pendingId)
          .subscribe((trips: Trip[]) => {
            if (this.pendingTrips) this.pendingTrips = trips;
          });
      } else {
        this.tripService
          .getTripsByDriverIdAndStatus(userId as number, pendingId)
          .subscribe((trips: Trip[]) => {
            if (this.pendingTrips) this.pendingTrips = trips;
          });
      }
    });
  }
}
