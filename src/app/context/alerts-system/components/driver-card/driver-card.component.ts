import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/entities/User';
import { CommonModule } from '@angular/common';
import { UserService } from '@app/shared/services/user/user.service';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css',
})
export class DriverCardComponent implements OnInit {
  drivers: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();

    this.userService.setEndpoint('drivers');

    this.userService.getDriversBySupervisorId(userId as number).subscribe({
      next: (response: User[]) => {
        console.log('Drivers obtenidos:', response);
        if (this.drivers) this.drivers = response.slice(0, 2);
      },
      error: (err) => {
        console.error('Error fetching drivers data:', err);
      },
    });
  }
}
