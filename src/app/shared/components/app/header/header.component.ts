import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { User } from '@shared/models/entities/User';
import { AuthService } from '@shared/services/auth/auth.service';
import { DriverService } from '@shared/services/user/driver/driver.service';
import { SupervisorService } from '@shared/services/user/supervisor/supervisor.service';
import { filter } from 'rxjs/operators';
import { DialogNotificationsComponent } from './components/dialog-notifications/dialog-notifications.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatMenuModule,
  ],
  providers: [AuthService, DriverService, SupervisorService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  userName: string | undefined = undefined;
  nameInitials: string | undefined = undefined;
  currentUrl: string = '';
  showDrivers: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private driverService: DriverService,
    private supervisorService: SupervisorService,
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });

    const userId = this.authService.getUserIdFromToken();
    const userTypeFromToken = this.authService.getUserTypeFromToken();

    this.showDrivers = userTypeFromToken === 'ROLE_SUPERVISOR';

    if (userTypeFromToken === 'ROLE_DRIVER') {
      this.driverService.getById(userId as number).subscribe({
        next: (response: User) => {
          this.userName = response.name;

          const nameInitial = response.name
            ? response.name.split(' ')[0].charAt(0)
            : '';
          const lastNameInitial = response.firstLastName
            ? response.firstLastName.split(' ')[0].charAt(0)
            : '';
          this.nameInitials = nameInitial + lastNameInitial;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
    } else {
      this.supervisorService.getById(userId as number).subscribe({
        next: (response: User) => {
          this.userName = response.name;

          const nameInitial = response.name
            ? response.name.split(' ')[0].charAt(0)
            : '';
          const lastNameInitial = response.firstLastName
            ? response.firstLastName.split(' ')[0].charAt(0)
            : '';
          this.nameInitials = nameInitial + lastNameInitial;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
    }
  }

  openNotifications(): void {
    this.dialog.open(DialogNotificationsComponent, {
      panelClass: 'notification-dialog',
    });
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToSupport(): void {
    this.router.navigate(['/support']);
  }

  logOut(): void {
    this.authService.logout();
  }

  openSidenav() {
    this.toggleSidenav.emit();
  }
}
