import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from '@shared/models/entities/Notification';
import { NotificationType } from '@shared/models/enum/notification-type';
import { NotificationService } from '@shared/services/notification/notification.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dialog-notifications',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  providers: [NotificationService],
  templateUrl: './dialog-notifications.component.html',
  styleUrl: './dialog-notifications.component.css',
})
export class DialogNotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private dialogRef: MatDialogRef<DialogNotificationsComponent>
  ) {}

  ngOnInit() {
    this.loadNotificationsHttp();
  }

  onRefreshNotifications() {
    this.loadNotificationsHttp();
  }

  private loadNotificationsHttp() {
    this.notificationService
      .getByUserId(this.data.userId)
      .pipe(
        catchError((error) => {
          console.error('HTTP fetch error:', error);
          return of([]);
        })
      )
      .subscribe((notifications) => {
        if (notifications && notifications.length > 0)
          this.notifications = notifications;
        else {
          this.notifications = [];
          console.log('No notifications found');
        }
      });
  }

  defineTitle = (notificationType: string): string => {
    switch (notificationType) {
      case NotificationType.Finished:
        return 'The Trip has just finished';
      case NotificationType.Cancelled:
        return 'The Trip has just been cancelled';
      case NotificationType.Assigned:
        return 'The Trip has been assigned to you';
      case NotificationType.Created:
        return 'The Trip has been created';
      case NotificationType.Started:
        return 'The Trip has been started';
      default:
        return '';
    }
  };

  defineImg = (notificationType: string): string => {
    switch (notificationType) {
      case NotificationType.Finished:
        return 'assets/img/notifications/trip_finished.png';
      case NotificationType.Cancelled:
        return 'assets/img/notifications/trip_cancelled.png';
      case NotificationType.Assigned:
        return 'assets/img/notifications/trip_assigned.png';
      case NotificationType.Created:
        return 'assets/img/notifications/trip_created.png';
      case NotificationType.Started:
        return 'assets/img/notifications/trip_created.png';
      default:
        return '';
    }
  };
}
