import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Notification } from '@shared/models/entities/Notification';
import { NotificationType } from '@shared/models/enum/notification-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-notifications',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-notifications.component.html',
  styleUrl: './dialog-notifications.component.css',
})
export class DialogNotificationsComponent {
  notifications: Notification[] = [
    {
      id: 1,
      type: NotificationType.Finished,
      tripId: 1,
    },
    {
      id: 2,
      type: NotificationType.Cancelled,
      tripId: 2,
    },
    {
      id: 3,
      type: NotificationType.Assigned,
      tripId: 3,
    },
    {
      id: 4,
      type: NotificationType.Created,
      tripId: 4,
    },
  ];

  defineTitle = (notificationType: NotificationType): string => {
    switch (notificationType) {
      case NotificationType.Finished:
        return 'The Trip has just finished';
      case NotificationType.Cancelled:
        return 'The Trip has just been cancelled';
      case NotificationType.Assigned:
        return 'The Trip has been assigned to you';
      case NotificationType.Created:
        return 'The Trip has been created';
    }
  };

  defineImg = (notificationType: NotificationType): string => {
    switch (notificationType) {
      case NotificationType.Finished:
        return 'assets/img/notifications/trip_finished.png';
      case NotificationType.Cancelled:
        return 'assets/img/notifications/trip_cancelled.png';
      case NotificationType.Assigned:
        return 'assets/img/notifications/trip_assigned.png';
      case NotificationType.Created:
        return 'assets/img/notifications/trip_created.png';
    }
  };
}
