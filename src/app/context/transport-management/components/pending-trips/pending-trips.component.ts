import { Component, OnInit } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { ResumeTripCardComponent } from '../resume-trip-card/resume-trip-card.component';
import { CommonModule } from '@angular/common';
import { TripService } from '@shared/services/trip/trip.service';
import { TripStatusService } from '@shared/services/trip-status/trip-status.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pending-trips',
  standalone: true,
  imports: [ResumeTripCardComponent, CommonModule],
  providers: [TripService, TripStatusService],
  templateUrl: './pending-trips.component.html',
  styleUrl: './pending-trips.component.css',
})
export class PendingTripsComponent implements OnInit {
  private subscription: Subscription = new Subscription();
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

    if (!userId || !userType) {
      console.error('User ID or User Type is undefined');
      return;
    }

    if (userType === 'ROLE_SUPERVISOR') {
      this.haveActions = true;
    }

    this.subscription = this.tripStatusService
      .getTripStatus()
      .pipe(
        catchError((error) => {
          console.error('Error fetching trip status:', error);
          return of(new Map());
        }),
        switchMap((tripStatusMap) => {
          const pendingId = tripStatusMap.get('PENDING');
          const inProgressId = tripStatusMap.get('IN_PROGRESS');

          if (pendingId == null || inProgressId == null) {
            console.error('Trip status IDs are null or undefined');
            return of([]);
          }

          if (userType === 'ROLE_SUPERVISOR') {
            return forkJoin({
              pending: this.tripService
                .getTripsBySupervisorIdAndStatus(userId, pendingId)
                .pipe(catchError(() => of([]))),
              inProgress: this.tripService
                .getTripsBySupervisorIdAndStatus(userId, inProgressId)
                .pipe(catchError(() => of([]))),
            });
          } else {
            return forkJoin({
              pending: this.tripService
                .getTripsByDriverIdAndStatus(userId, pendingId)
                .pipe(catchError(() => of([]))),
              inProgress: this.tripService
                .getTripsByDriverIdAndStatus(userId, inProgressId)
                .pipe(catchError(() => of([]))),
            });
          }
        })
      )
      .subscribe({
        next: (results) => {
          if (Array.isArray(results)) {
            this.pendingTrips = results;
          } else {
            this.pendingTrips = [
              ...(results.pending === null ? [] : results.pending),
              ...(results.inProgress === null ? [] : results.inProgress),
            ];
          }
        },
        error: (error) => console.error('Error in trip processing:', error),
      });
  }

  // Add cleanup
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
