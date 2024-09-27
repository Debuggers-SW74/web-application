import { TripStatus } from '../enum/trip-status';

export interface Trip {
  id: number;
  driverId: number;
  supervisorId: number;
  from: string;
  to: string;
  type: string;
  amount: number;
  weight: number;
  date: Date;
  departureTime: string;
  arrivalTime: string;
  subject: string;
  description: string;
  status: TripStatus;
}
