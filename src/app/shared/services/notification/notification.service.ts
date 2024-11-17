import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Notification } from '@shared/models/entities/Notification';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '@app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService<Notification> {
  private socket: Socket;
  socketUrl = environment.webSocketUrl;

  constructor(http: HttpClient) {
    super(http, new AuthService(new Router()), '/notifications');
    this.socket = io(`${this.socketUrl}/notification`, {
      extraHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  connectToWebSocket() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
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
