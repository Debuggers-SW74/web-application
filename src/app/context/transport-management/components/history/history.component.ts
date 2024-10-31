import { Component } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
// import { TripStatus } from '@shared/models/enum/trip-status';
import { ResumeTripCardComponent } from '../resume-trip-card/resume-trip-card.component';
import { CommonModule } from '@angular/common';
import { TripService } from '@shared/services/trip/trip.service';
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
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();

    if (userType === 'ROLE_SUPERVISOR') {
      this.tripService
        .getHistoryTripsBySupervisorId(userId as number)
        .subscribe((trips: Trip[]) => {
          if (this.historyTrips) this.historyTrips = trips;
        });
    } else {
      this.tripService
        .getHistoryTripsByDriverId(userId as number)
        .subscribe((trips: Trip[]) => {
          if (this.historyTrips) this.historyTrips = trips;
        });
    }
  }
  // historyTrips: Trip[] = [
  //   {
  //     id: 1,
  //     driverId: 1,
  //     driverName: 'Juan',
  //     driverPhone: '123456789',
  //     supervisorId: 1,
  //     supervisorName: 'Carlos',
  //     supervisorPhone: '987654321',
  //     origin: 'Ubicación inicial',
  //     destination: 'Ubicación final',
  //     type: 'GNV',
  //     amount: 230,
  //     weight: 1000,
  //     date: new Date(),
  //     startTime: '10:00',
  //     endTime: '12:00',
  //     subject: '',
  //     description: '',
  //     status: TripStatus.Completed,
  //   },
  // ];
}
