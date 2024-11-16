import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '@shared/services/base/base.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { Threshold } from '@shared/models/entities/threshold';

@Injectable({
  providedIn: 'root',
})
export class ThresholdService extends BaseService<Threshold> {
  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/thresholds');
  }

  sensorsMap = new Map<string, number>([
    ['SENSOR_GAS', 1],
    ['SENSOR_HUMIDITY', 2],
    ['SENSOR_PRESSURE', 3],
    ['SENSOR_TEMPERATURE', 4],
  ]);

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
