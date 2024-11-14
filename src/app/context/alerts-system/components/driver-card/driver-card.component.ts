import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisorService } from '@shared/services/user/supervisor/supervisor.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { ResultDriver } from '@app/context/transport-management/models/ResultDriver';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [CommonModule],
  providers: [SupervisorService],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css',
})
export class DriverCardComponent implements OnInit {
  drivers: ResultDriver[] = [];

  constructor(
    private supervisorService: SupervisorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();

    this.supervisorService
      .getDriversBySupervisorId(userId as number)
      .subscribe({
        next: (response: ResultDriver[]) => {
          console.log('Drivers obtenidos:', response);
          if (response) this.drivers = response.slice(0, 2);
        },
        error: (err) => {
          console.error('Error fetching drivers data:', err);
        },
      });
  }
}
