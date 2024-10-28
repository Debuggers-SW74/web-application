import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@app/environments/environments';
import { Authenticate } from '@shared/models/entities/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected authUrl = environment.authUrl;
  private readonly TOKEN_KEY = 'authToken';

  constructor(protected http: HttpClient, private router: Router) {}

  authenticate(authenticate: Authenticate): Observable<Authenticate> {
    return this.http.post<Authenticate>(this.authUrl, authenticate);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/sign-in']);
  }
}
