import { Component, OnInit } from '@angular/core';
import {
  Notification,
  NotificationMessages,
  NotificationIcons,
  NotificationType
} from '../../models/notification.model';
import { SocketService } from '../../services/socket.service';
import { SocketEventNameModel } from '../../models/enumeration/socket-event-name.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  notificationStatus = false;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.getNotificationFromWebSocket();
  }

  getNotificationFromWebSocket() {
    return this.socketService
      .listen(SocketEventNameModel.NOTIFICATION)
      .subscribe(data => {
        this.notificationStatus = true;
        this.notifications.unshift(data);
      });
  }

  checkNewNotifications(): void {
    this.notificationStatus = false;
  }

  renderNotificationMessage(notificationType: NotificationType): string {
    return NotificationMessages.get(notificationType);
  }

  renderNotificationIcon(notificationType: NotificationType): string {
    return NotificationIcons.get(notificationType);
  }
}
