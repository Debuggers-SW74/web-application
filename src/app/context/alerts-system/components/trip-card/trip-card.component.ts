import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TripService } from '@app/shared/services/trip/trip.service';
import { Trip } from '@shared/models/entities/Trip';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  providers: [TripService],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userType = this.authService.getUserTypeFromToken();
    console.log(userType);

    if (userType === 'ROLE_SUPERVISOR') {
      this.tripService.getTripsBySupervisorId(userId as number).subscribe({
        next: (response: Trip[]) => {
          console.log('Trips obtenidos:', response);
          if (this.trips) this.trips = response.slice(0, 2);
        },
        error: (err) => {
          console.error('Error fetching trips data:', err);
        },
      });
    } else {
      this.tripService.getTripsByDriverId(userId as number).subscribe({
        next: (response: Trip[]) => {
          console.log('Trips obtenidos:', response);
          if (this.trips) this.trips = response.slice(0, 2);
        },
        error: (err) => {
          console.error('Error fetching trips data:', err);
        },
      });
    }
  }
}
