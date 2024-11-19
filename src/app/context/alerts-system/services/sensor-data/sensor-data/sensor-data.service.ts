import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseService } from '@shared/services/base/base.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { SensorData } from '@app/shared/models/entities/SensorData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService extends BaseService<SensorData> {
  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/sensor-data');
  }

  getByTripId(tripId: number): Observable<SensorData[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<SensorData[]>(
      `${this.baseUrl}${this.endpoint}/trip/${tripId}`,
      {
        headers,
      }
    );
  }
}
