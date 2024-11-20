export interface Alert {
  sensorType: string;
  value: number;
  timestamp: string;
  tripId: number;
}

export interface AlertReceive {
  id: number;
  alertLevel: string;
  message: string;
  sensorData: Alert;
}
