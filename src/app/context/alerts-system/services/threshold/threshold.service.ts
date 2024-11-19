import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '@shared/services/base/base.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { Threshold } from '@shared/models/entities/threshold';

@Injectable({
  providedIn: 'root',
})
export class ThresholdService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/thresholds');
  }

  sensorsMap = new Map<string, number>([
    ['SENSOR_GAS', 1],
    ['SENSOR_TEMPERATURE', 2],
    ['SENSOR_PRESSURE', 3],
    ['SENSOR_HUMIDITY', 4],
  ]);

  thresholdsDefaultValues = [
    {
      sensorTypeId: 1, // SENSOR_GAS
      maxThreshold: 50,
      minThreshold: 0,
    },
    {
      sensorTypeId: 2, // SENSOR_TEMPERATURE
      maxThreshold: 40,
      minThreshold: 0,
    },
    {
      sensorTypeId: 3, // SENSOR_PRESSURE
      maxThreshold: 125,
      minThreshold: 0,
    },
    {
      sensorTypeId: 4, // SENSOR_HUMIDITY
      maxThreshold: 80,
      minThreshold: 0,
    },
  ];

  createDefaultThresholds(
    tripId: number,
    supervisorId: number
  ): Promise<any[]> {
    const headers = this.getAuthHeaders();

    const createThresholdPromises = this.thresholdsDefaultValues.map(
      (threshold) => {
        return this.http
          .post(
            `${this.baseUrl}${this.endpoint}`,
            {
              ...threshold,
              tripId,
              supervisorId,
            },
            {
              headers,
            }
          )
          .toPromise();
      }
    );

    return Promise.all(createThresholdPromises);
  }

  getByTripId(tripId: number) {
    const headers = this.getAuthHeaders();

    return this.http.get<Threshold[]>(
      `${this.baseUrl}${this.endpoint}/trip/${tripId}`,
      {
        headers,
      }
    );
  }
}
