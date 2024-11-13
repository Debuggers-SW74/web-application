import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Authenticate } from '@shared/models/entities/User';
import { Observable } from 'rxjs';
import { BaseService } from '../../base/base.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService<T> extends BaseService<T> {
  protected override endpoint: string = '';

  constructor(http: HttpClient, @Inject(String) endpoint: string) {
    super(http, new AuthService(new Router()), endpoint);
  }

  authenticate(authenticate: Authenticate): Observable<Authenticate> {
    return this.http.post<Authenticate>('/auth', authenticate);
  }
}
