import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css'
})
export class DriverCardComponent {
  @Input() driverName!: string;
  @Input() driverPhoto!: string;
}
