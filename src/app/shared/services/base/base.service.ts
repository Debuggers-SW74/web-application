import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected baseUrl = environment.apiUrl;
  protected authUrl = environment.authUrl;

  constructor(protected http: HttpClient, private authService: AuthService) {}

  // Método para construir headers con el token JWT si está disponible
  protected getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Método GET genérico
  getAll(endpoint: string, requireAuth: boolean = true): Observable<T[]> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.get<T[]>(this.baseUrl + endpoint, { headers });
  }

  // Método GET por ID
  getById(
    endpoint: string,
    id: number | string,
    requireAuth: boolean = true
  ): Observable<T> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.get<T>(`${this.baseUrl + endpoint}/${id}`, { headers });
  }

  // Método POST genérico
  create(
    endpoint: string,
    data: T,
    requireAuth: boolean = true
  ): Observable<T> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.post<T>(this.baseUrl + endpoint, data, { headers });
  }

  // Método PUT genérico
  update(
    endpoint: string,
    data: T,
    requireAuth: boolean = true
  ): Observable<T> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.put<T>(`${this.baseUrl + endpoint}/update`, data, {
      headers,
    });
  }

  // Método DELETE genérico
  delete(
    endpoint: string,
    id: number | string,
    requireAuth: boolean = true
  ): Observable<void> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.delete<void>(`${this.baseUrl + endpoint}/${id}`, {
      headers,
    });
  }
}
