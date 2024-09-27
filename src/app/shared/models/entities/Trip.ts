export interface Trip {
  id: number;
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
}
