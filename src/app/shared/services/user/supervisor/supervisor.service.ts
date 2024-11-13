import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Driver, User } from '@shared/models/entities/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService extends UserService<User> {
  constructor(http: HttpClient) {
    super(http, '/supervisors');
  }

  getDriversBySupervisorId(supervisorId: number): Observable<Driver[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Driver[]>(
      this.baseUrl + this.endpoint + '/' + supervisorId + '/drivers',
      { headers }
    );
  }
}
