import { Component } from '@angular/core';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { DriverCardComponent } from '../driver-card/driver-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-idle-trip',
  standalone: true,
  imports: [TripCardComponent, DriverCardComponent, RouterModule],
  templateUrl: './idle-trip.component.html',
  styleUrl: './idle-trip.component.css',
})
export class IdleTripComponent { }
