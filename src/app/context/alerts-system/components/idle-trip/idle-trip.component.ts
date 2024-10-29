import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { DriverCardComponent } from '../driver-card/driver-card.component';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-idle-trip',
  standalone: true,
  imports: [TripCardComponent, DriverCardComponent, RouterModule, CommonModule],
  templateUrl: './idle-trip.component.html',
  styleUrl: './idle-trip.component.css',
})
export class IdleTripComponent implements OnInit {
  userType: string | undefined = undefined;
  showDrivers = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userTypeFromToken = this.authService.getUserTypeFromToken();

    this.userType = userTypeFromToken as string;

    this.showDrivers = this.userType !== 'ROLE_DRIVER';
  }
}
