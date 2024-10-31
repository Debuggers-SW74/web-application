import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor(private router: Router) {}

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/sign-in']);
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  getUserTypeFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
}
