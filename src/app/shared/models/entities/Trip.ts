// import { TripStatus } from '../enum/trip-status';

export interface Trip {
  tripId: number;
  driverId: number;
  driverName: string;
  driverPhone: string;
  supervisorId: number;
  supervisorName: string;
  supervisorPhone: string;
  origin: string;
  destination: string;
  type: string;
  amount: number;
  weight: number;
  date: Date;
  startTime: string;
  endTime: string;
  subject: string;
  description: string;
  status: string;
}

export interface TripCreate {
  driverId: number;
  supervisorId: number;
  origin: string;
  destination: string;
  type: string;
  amount: number;
  weight: number;
  date: Date;
  startTime: string;
  endTime: string;
  subject: string;
  description: string;
}

export interface TripStatus {
  id: number;
  status: string;
}
