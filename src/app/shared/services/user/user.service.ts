import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/entities/User';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  private endpoint = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  signIn(email: string, password: string): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}${this.endpoint}?email=${email}&password=${password}`
    );
  }
}
