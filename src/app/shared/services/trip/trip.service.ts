import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { BaseService } from '../base/base.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<Trip> {
  private endpoint = 'trips';

  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()));
  }
}
