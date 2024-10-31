import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate, User, Driver } from '@shared/models/entities/User';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
    return this.http.post<Driver>(`${this.endpoint}/register`, driver);
  }

  getDriversBySupervisorId(supervisorId: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(
      this.endpoint + '/supervisors/' + supervisorId
    );
  }

  getSupervisors(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint + '/supervisors');
  }

  getDriverByNameOrSensorCode(nameOrSensorCode: string): Observable<Driver[]> {
    // Se requiere autenticación para obtener el usuario por ID
    return this.http.get<Driver[]>(
      this.endpoint + '?nameOrSensorCode=' + nameOrSensorCode
    );
  }
}
