import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { DriverCardComponent } from '../driver-card/driver-card.component';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { UserService } from '@app/shared/services/user/user/user.service';
import { User } from '@app/shared/models/entities/User';

@Component({
  selector: 'app-idle-trip',
  standalone: true,
  imports: [TripCardComponent, DriverCardComponent, RouterModule, CommonModule],
  providers: [UserService],
  templateUrl: './idle-trip.component.html',
  styleUrl: './idle-trip.component.css',
})
export class IdleTripComponent implements OnInit {
  userType: string | undefined = undefined;
  showDrivers = false;
  userName = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userTypeFromToken = this.authService.getUserTypeFromToken();

    this.userType = userTypeFromToken as string;

    const endpoint =
      this.userType === 'ROLE_DRIVER' ? 'drivers' : 'supervisors';

    this.showDrivers = this.userType !== 'ROLE_DRIVER';

    this.userService
      .getById(endpoint, userId as number)
      .subscribe((user: User) => {
        this.userName = user.name;
      });
  }
}
