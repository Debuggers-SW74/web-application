import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate, User } from '@shared/models/entities/User';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  private endpoint: string | undefined = 'drivers';

  constructor(http: HttpClient) {
    super(http);
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  authenticate(authenticate: Authenticate): Observable<Authenticate> {
    return this.http.post<Authenticate>(this.authUrl, authenticate);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl + this.endpoint + '/register',
      user
    );
  }
}
