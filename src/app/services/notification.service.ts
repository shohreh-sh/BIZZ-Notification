import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // It's better set the Base Url in ENV
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  create(notificationData: Notification): Observable<Notification> {
    return this.http
      .post<Notification>(
        `${this.baseUrl}/create-notification`,
        notificationData,
        {}
      )
      .pipe(
        tap(notifications =>
          console.log('notifications: ' + JSON.stringify(notifications))
        ),
        catchError(this.handleError(notificationData))
      );
  }
  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
