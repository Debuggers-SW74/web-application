import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTripComponent } from '../../components/active-trip/active-trip.component';
import { IdleTripComponent } from '../../components/idle-trip/idle-trip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActiveTripComponent, IdleTripComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  activeTrip: boolean = false;

  constructor() { }

  ngOnInit() { }
}
