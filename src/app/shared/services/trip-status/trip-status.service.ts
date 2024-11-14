import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { TripStatus } from '@app/shared/models/entities/Trip';
import { AuthService } from '../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TripStatusService {
  protected baseUrl = environment.apiUrl;
  protected endpoint: string = '/trip-status';
  tripStatus = new Map<string, number>();

  constructor(protected http: HttpClient, private authService: AuthService) {}

  getTripStatus(): Observable<Map<string, number>> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http
      .get<TripStatus[]>(this.baseUrl + this.endpoint, { headers })
      .pipe(
        map((response: TripStatus[]) => {
          const tripStatusMap = new Map<string, number>();
          response.forEach((status) => {
            tripStatusMap.set(status.status, status.id);
          });
          return tripStatusMap;
        }),
        catchError((err) => {
          console.error('Error fetching trip status:', err);
          return throwError(err);
        })
      );
  }
}
