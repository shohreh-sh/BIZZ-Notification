import { Injectable } from '@angular/core';
import * as Socket from 'socket.io-client';
import { Observable } from 'rxjs';
import {Notification} from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  readonly url: string = 'http://localhost:8080';

  constructor() {
    this.socket = Socket(this.url);
  }

  listen(eventName: string): Observable<Notification> {
    return new Observable(subscriber => {
      this.socket.on(eventName, data => {
        console.log(data);
        subscriber.next(data);
      });
    });
  }
}
