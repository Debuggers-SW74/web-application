import { NotificationType } from '../enum/notification-type';

export interface Notification {
  id: number;
  type: NotificationType;
  tripId: number;
}
