import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogNotificationsComponent } from './components/dialog-notifications/dialog-notifications.component';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  userName = 'John Doe';
  nameInitials = 'JD';

  currentUrl: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
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
