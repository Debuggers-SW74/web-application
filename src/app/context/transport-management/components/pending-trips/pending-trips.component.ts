import { Component, OnInit } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
// import { TripStatus } from '@shared/models/enum/trip-status';
import { ResumeTripCardComponent } from '../resume-trip-card/resume-trip-card.component';
import { CommonModule } from '@angular/common';
import { TripService } from '@shared/services/trip/trip.service';
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

  constructor(
    private authService: AuthService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    if (userType === 'ROLE_SUPERVISOR') {
      this.tripService
        .getPendingTripsBySupervisorId(userId as number)
        .subscribe((trips: Trip[]) => {
          if (this.pendingTrips) this.pendingTrips = trips;
        });
    } else {
      this.tripService
        .getPendingTripsByDriverId(userId as number)
        .subscribe((trips: Trip[]) => {
          if (this.pendingTrips) this.pendingTrips = trips;
        });
    }
  }
}
