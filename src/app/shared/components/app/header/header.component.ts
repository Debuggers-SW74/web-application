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
import { UserService } from '@shared/services/user/user.service';
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
  providers: [AuthService],
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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });

    const userId = this.authService.getUserIdFromToken() ?? 0;
    const userTypeFromToken = this.authService.getUserTypeFromToken();

    const endpoint =
      userTypeFromToken === 'ROLE_DRIVER' ? 'drivers' : 'supervisors';
    this.showDrivers = userTypeFromToken === 'ROLE_SUPERVISOR';
    console.log(userTypeFromToken);
    console.log(this.showDrivers);

    this.userService.getById(endpoint, userId).subscribe({
      next: (response: User) => {
        console.log('Usuario obtenido:', response);
        this.userName = response.name + ' ' + response.firstLastName;
        this.nameInitials =
          response.name.split(' ')[0].charAt(0) +
          response.firstLastName.split(' ')[0].charAt(0);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
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
