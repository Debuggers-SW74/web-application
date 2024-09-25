import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input() driverName!: string;
  @Input() driverPhoto!: string;
  @Input() from!: string;
  @Input() to!: string;
}
