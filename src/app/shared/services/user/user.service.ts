import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate, User, Driver } from '@shared/models/entities/User';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ResultDriver } from '@app/context/transport-management/models/ResultDriver';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  private endpoint: string | undefined = 'drivers';

  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()));
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  authenticate(authenticate: Authenticate): Observable<Authenticate> {
    // No se necesita autenticación, por lo que se pasa `requireAuth: false`
    return this.http.post<Authenticate>(this.authUrl, authenticate);
  }

  registerSupervisor(user: User): Observable<User> {
    return this.create(`${this.endpoint}/register`, user, false);
  }

  registerDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(
      this.baseUrl + `${this.endpoint}/register`,
      driver
    );
  }

  updateDriver(driver: Driver): Observable<Driver> {
    const headers = this.getAuthHeaders();
    return this.http.put<Driver>(
      this.baseUrl + `${this.endpoint}/update`,
      driver,
      {
        headers,
      }
    );
  }

  getAllDrivers(): Observable<ResultDriver[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<ResultDriver[]>(this.baseUrl + this.endpoint, {
      headers,
    });
  }

  getDriverById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(this.baseUrl + `${this.endpoint}/${driverId}`);
  }

  getDriversBySupervisorId(supervisorId: number): Observable<Driver[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Driver[]>(
      this.baseUrl + this.endpoint + '/supervisor/' + supervisorId,
      { headers }
    );
  }

  getSupervisors(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + this.endpoint + '/supervisors');
  }

  getDriverByNameOrSensorCode(nameOrSensorCode: string): Observable<Driver[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Driver[]>(
      this.baseUrl + this.endpoint + '?nameOrSensorCode=' + nameOrSensorCode,
      { headers }
    );
  }
}
