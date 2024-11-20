import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Alert, AlertReceive } from '@shared/models/entities/Alert';
import { AuthService } from '@shared/services/auth/auth.service';
import { BaseService } from '@shared/services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsService extends BaseService<Alert> {
  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/alerts');
  }

  getByTripId(tripId: number): Observable<AlertReceive[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<AlertReceive[]>(
      `${this.baseUrl}${this.endpoint}/trip/${tripId}`,
      { headers }
    );
  }
}
