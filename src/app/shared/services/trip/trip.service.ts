import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip, TripCreate } from '@shared/models/entities/Trip';
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

  createTrip(trip: TripCreate): Observable<TripCreate> {
    const headers = this.getAuthHeaders();

    return this.http.post<TripCreate>(
      this.baseUrl + this.endpoint + '/create',
      trip,
      {
        headers,
      }
    );
  }

  getTripsByDriverId(driverId: number): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl + this.endpoint + '/driver/' + driverId,
      {
        headers,
      }
    );
  }

  getTripsBySupervisorId(supervisorId: number): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl + this.endpoint + '/supervisor/' + supervisorId,
      {
        headers,
      }
    );
  }

  getPendingTripsByDriverId(driverId: number): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl + this.endpoint + '/driver/' + driverId + '/status/1',
      {
        headers,
      }
    );
  }

  getPendingTripsBySupervisorId(supervisorId: number): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl +
        this.endpoint +
        '/supervisor/' +
        supervisorId +
        '/status/1',
      {
        headers,
      }
    );
  }

  getHistoryTripsByDriverId(driverId: number): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl + this.endpoint + '/driver/' + driverId + '/status/2',
      {
        headers,
      }
    );
  }

  getHistoryTripsBySupervisorId(supervisorId: number): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl +
        this.endpoint +
        '/supervisor/' +
        supervisorId +
        '/status/2',
      {
        headers,
      }
    );
  }
}
