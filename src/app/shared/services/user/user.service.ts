import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate, User } from '@shared/models/entities/User';
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

  register(user: User): Observable<User> {
    // No se necesita autenticación para el registro
    return this.create(`${this.endpoint}/register`, user, false);
  }

  getDriversBySupervisorId(supervisorId: number): Observable<User[]> {
    return this.http.get<User[]>(
      this.endpoint + '/supervisors/' + supervisorId
    );
  }

  getSupervisors(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint + '/supervisors');
  }

  getUserByNameOrSensorCode(nameOrSensorCode: string): Observable<User> {
    // Se requiere autenticación para obtener el usuario por ID
    return this.http.get<User>(
      this.endpoint + '?nameOrSensorCode=' + nameOrSensorCode
    );
  }
}
