import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip, TripCreate, TripStatus } from '@shared/models/entities/Trip';
import { BaseService } from '../base/base.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<Trip> {
  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/trips');
  }

  getTripsByDriverIdAndStatus(
    driverId: number,
    status: number
  ): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl +
        this.endpoint +
        '/driver/' +
        driverId +
        '/status/' +
        status,
      {
        headers,
      }
    );
  }

  getTripsBySupervisorIdAndStatus(
    supervisorId: number,
    status: number
  ): Observable<Trip[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Trip[]>(
      this.baseUrl +
        this.endpoint +
        '/supervisor/' +
        supervisorId +
        '/status/' +
        status,
      {
        headers,
      }
    );
  }

  startTrip(tripId: number): Observable<void> {
    const headers = this.getAuthHeaders();

    return this.http.post<void>(
      this.baseUrl + this.endpoint + tripId + '/starts',
      null,
      {
        headers,
      }
    );
  }

  finishTrip(tripId: number): Observable<void> {
    const headers = this.getAuthHeaders();

    return this.http.post<void>(
      this.baseUrl + this.endpoint + '/' + tripId + '/completions',
      null,
      {
        headers,
      }
    );
  }

  cancelTrip(tripId: number): Observable<void> {
    const headers = this.getAuthHeaders();

    return this.http.post<void>(
      this.baseUrl + this.endpoint + '/' + tripId + '/cancellations',
      null,
      {
        headers,
      }
    );
  }
}
