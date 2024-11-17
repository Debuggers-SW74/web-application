import { Injectable } from '@angular/core';
import { Driver } from '@shared/models/entities/User';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { ResultDriver } from '@app/context/transport-management/models/ResultDriver';

@Injectable({
  providedIn: 'root',
})
export class DriverService extends UserService<Driver> {
  constructor(http: HttpClient) {
    super(http, '/drivers');
  }

  getDriverByNameOrSensorCode(nameOrSensorCode: string): Observable<Driver[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Driver[]>(
      this.baseUrl + '?nameOrSensorCode=' + nameOrSensorCode,
      { headers }
    );
  }
}
