import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

type EntityResponseType = HttpResponse<Notification>;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // It's better set the Base Url in ENV
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  create(eventDate: Notification): Observable<EntityResponseType> {
    return this.http.post<Notification>(`${this.baseUrl}/create-notification`, eventDate, {
      observe: 'response'
    });
  }
}
