import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  // Método GET genérico
  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + endpoint);
  }

  // Método GET por ID
  getById(endpoint: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl + endpoint}/${id}`);
  }

  // Método POST genérico
  create(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, data);
  }

  // Método PUT genérico
  update(endpoint: string, id: number | string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl + endpoint}/${id}`, data);
  }

  // Método DELETE genérico
  delete(endpoint: string, id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl + endpoint}/${id}`);
  }
}
