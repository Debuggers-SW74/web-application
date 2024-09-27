import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '@shared/models/entities/Trip';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<Trip> {
  private endpoint = 'trips';

  constructor(http: HttpClient) {
    super(http);
  }
}
