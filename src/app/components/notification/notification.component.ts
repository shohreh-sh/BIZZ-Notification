import { Component, OnInit } from '@angular/core';
import {Notification} from '../../models/notification.model';
import {SocketService} from '../../services/socket.service';
import {SocketEventNameModel} from '../../models/enumeration/socket-event-name.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.getNotificationFromWebSocket();
  }

  getNotificationFromWebSocket() {
    return this.socketService.listen(SocketEventNameModel.NOTIFICATION).subscribe(data => {
      this.notifications.unshift(data);
      console.log(this.notifications)
    });
  }

}
