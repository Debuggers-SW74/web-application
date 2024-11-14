import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { DriverCardComponent } from '../driver-card/driver-card.component';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { DriverService } from '@shared/services/user/driver/driver.service';
import { SupervisorService } from '@shared/services/user/supervisor/supervisor.service';

@Component({
  selector: 'app-idle-trip',
  standalone: true,
  imports: [TripCardComponent, DriverCardComponent, RouterModule, CommonModule],
  providers: [DriverService, SupervisorService],
  templateUrl: './idle-trip.component.html',
  styleUrl: './idle-trip.component.css',
})
export class IdleTripComponent implements OnInit {
  userType: string | undefined = undefined;
  showDrivers = false;
  userName = '';

  constructor(
    private authService: AuthService,
    private driverService: DriverService,
    private supervisorService: SupervisorService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    const userTypeFromToken = this.authService.getUserTypeFromToken();

    this.userType = userTypeFromToken as string;

    this.showDrivers = this.userType !== 'ROLE_DRIVER';

    if (this.userType === 'ROLE_DRIVER') {
      this.driverService.getById(userId as number).subscribe((driver) => {
        this.userName = driver.name;
      });
    } else {
      this.supervisorService
        .getById(userId as number)
        .subscribe((supervisor) => {
          this.userName = supervisor.name;
        });
    }
  }
}
