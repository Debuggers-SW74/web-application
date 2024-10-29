import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TripService } from '@app/shared/services/trip/trip.service';
import { Trip } from '@shared/models/entities/Trip';

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

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getAll('trips').subscribe({
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
