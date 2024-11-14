import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '@shared/models/entities/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultDriver } from '@app/context/transport-management/models/ResultDriver';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService extends UserService<User> {
  constructor(http: HttpClient) {
    super(http, '/supervisors');
  }

  getDriversBySupervisorId(supervisorId: number): Observable<ResultDriver[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<ResultDriver[]>(
      this.baseUrl + this.endpoint + '/' + supervisorId + '/drivers',
      { headers },
    );
  }
}
