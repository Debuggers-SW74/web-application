import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { environment } from '@app/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected baseUrl = environment.apiUrl;
  protected endpoint: string;

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    @Inject(String) endpoint: string
  ) {
    this.endpoint = endpoint;
  }

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
  getAll(requireAuth: boolean = true): Observable<T[]> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.get<T[]>(this.baseUrl + this.endpoint, { headers });
  }

  // Método GET por ID
  getById(id: number | string, requireAuth: boolean = true): Observable<T> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.get<T>(`${this.baseUrl + this.endpoint}/${id}`, {
      headers,
    });
  }

  // Método POST genérico
  create(data: T, requireAuth: boolean = true): Observable<T> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.post<T>(this.baseUrl + this.endpoint, data, { headers });
  }

  // Método PUT genérico
  update(data: T, requireAuth: boolean = true): Observable<T> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.put<T>(this.baseUrl + this.endpoint, data, { headers });
  }

  // Método DELETE genérico
  delete(id: number | string, requireAuth: boolean = true): Observable<void> {
    const headers = requireAuth ? this.getAuthHeaders() : new HttpHeaders();
    return this.http.delete<void>(`${this.baseUrl + this.endpoint}/${id}`, {
      headers,
    });
  }
}
