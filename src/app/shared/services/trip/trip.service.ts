import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { BaseService } from '../base/base.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<Trip> {
  private endpoint = 'trips';

  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()));
  }

  getTripsByDriverId(driverId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint + '/driver/' + driverId);
  }

  getTripsBySupervisorId(supervisorId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint + '/supervisor/' + supervisorId);
  }

  getPendingTripsByDriverId(driverId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      this.endpoint + '/driver/' + driverId + '/status/PENDING'
    );
  }

  getPendingTripsBySupervisorId(supervisorId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      this.endpoint + '/pending/' + supervisorId + '/status/PENDING'
    );
  }

  getHistoryTripsByDriverId(driverId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      this.endpoint + '/driver/' + driverId + '/status/FINISHED'
    );
  }

  getHistoryTripsBySupervisorId(supervisorId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      this.endpoint + '/supervisor/' + supervisorId + '/status/FINISHED'
    );
  }
}
