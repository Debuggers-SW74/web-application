import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTripComponent } from '../../components/active-trip/active-trip.component';
import { IdleTripComponent } from '../../components/idle-trip/idle-trip.component';
import { TripService } from '@shared/services/trip/trip.service';
import { TripStatusService } from '@shared/services/trip-status/trip-status.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { Trip } from '@shared/models/entities/Trip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActiveTripComponent, IdleTripComponent],
  providers: [TripService, TripStatusService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  activeTrip: boolean = false;
  isSupervisor: boolean = false;
  trips: Trip[] = [];

  constructor(
    private tripStatusService: TripStatusService,
    private tripService: TripService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    this.isSupervisor = userType === 'ROLE_SUPERVISOR';

    this.tripStatusService.getTripStatus().subscribe((tripStatusMap) => {
      const inProgressId = tripStatusMap.get('IN_PROGRESS') as number;

      if (this.isSupervisor) {
        this.tripService
          .getTripsBySupervisorIdAndStatus(userId as number, inProgressId)
          .subscribe({
            next: (response: Trip[]) => {
              console.log('Trips obtenidos:', response);
              if (response)
                response.map((trip) => {
                  this.activeTrip = true;
                  this.trips.push(trip);
                });
              else this.trips = [];
            },
            error: (err) => {
              console.error('Error fetching trips data:', err);
              this.trips = [];
              alert('Error fetching trips data');
            },
          });
      } else {
        this.tripService
          .getTripsByDriverIdAndStatus(userId as number, inProgressId)
          .subscribe({
            next: (response: Trip[]) => {
              console.log('Trips obtenidos:', response);
              if (response)
                response.map((trip) => {
                  this.activeTrip = true;
                  this.trips.push(trip);
                });
              else this.trips = [];
            },
            error: (err) => {
              console.error('Error fetching trips data:', err);
              this.trips = [];
              alert('Error fetching trips data');
            },
          });
      }
    });

    // this.tripStatusService.getTripStatus().subscribe((tripStatusMap) => {
    //   const pendingId = tripStatusMap.get('PENDING') as number;

    //   if (userType === 'ROLE_SUPERVISOR') {
    //     this.tripService
    //       .getTripsBySupervisorIdAndStatus(userId as number, pendingId)
    //       .subscribe({
    //         next: (response: Trip[]) => {
    //           console.log('Trips obtenidos:', response);
    //           if (response)
    //             response.map((trip) => {
    //               const today = new Date();
    //               const tripDate = new Date(trip.date);
    //               if (
    //                 today.getFullYear() === tripDate.getFullYear() &&
    //                 today.getMonth() === tripDate.getMonth() &&
    //                 today.getDate() === tripDate.getDate()
    //               )
    //                 this.tripService.startTrip(trip.tripId).subscribe({
    //                   next: (response) => {
    //                     console.log('Trip started:', response);
    //                     this.activeTrip = true;
    //                     this.trips.push(trip);
    //                   },
    //                   error: (err) => {
    //                     console.error('Error starting trip:', err);
    //                     alert('Error starting trip');
    //                   },
    //                 });
    //             });
    //           else this.trips = [];
    //         },
    //         error: (err) => {
    //           console.error('Error fetching trips data:', err);
    //           this.trips = [];
    //           alert('Error fetching trips data');
    //         },
    //       });
    //   } else {
    //     this.tripService
    //       .getTripsByDriverIdAndStatus(userId as number, pendingId)
    //       .subscribe({
    //         next: (response: Trip[]) => {
    //           console.log('Trips obtenidos:', response);
    //           if (response)
    //             response.map((trip) => {
    //               const today = new Date();
    //               const tripDate = new Date(trip.date);
    //               if (
    //                 today.getFullYear() === tripDate.getFullYear() &&
    //                 today.getMonth() === tripDate.getMonth() &&
    //                 today.getDate() === tripDate.getDate()
    //               )
    //                 this.tripService.startTrip(trip.tripId).subscribe({
    //                   next: (response) => {
    //                     console.log('Trip started:', response);
    //                     this.activeTrip = true;
    //                     this.trips.push(trip);
    //                   },
    //                   error: (err) => {
    //                     console.error('Error starting trip:', err);
    //                     alert('Error starting trip');
    //                   },
    //                 });
    //             });
    //           else this.trips = [];
    //         },
    //         error: (err) => {
    //           console.error('Error fetching trips data:', err);
    //           this.trips = [];
    //           alert('Error fetching trips data');
    //         },
    //       });
    //   }
    // });
  }
}
