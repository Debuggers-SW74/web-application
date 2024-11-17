export interface Notification {
  id: number;
  timestamp: string;
  type: string;
  seen: boolean;
  userId: number;
  tripId: number;
}
