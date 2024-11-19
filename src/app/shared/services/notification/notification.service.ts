import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Notification } from '@shared/models/entities/Notification';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService<Notification> {
  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/notifications');
  }

  getByUserId(userId: number) {
    const headers = this.getAuthHeaders();
    return this.http.get<Notification[]>(
      `${this.baseUrl}${this.endpoint}/${userId}/users`,
      { headers }
    );
  }

  markAsRead(userId: number) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}${this.endpoint}/${userId}/read`, {
      headers,
    });
  }
}
