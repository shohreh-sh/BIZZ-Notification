import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';
import { SocketService } from '../../services/socket.service';
import { of } from 'rxjs';
import {
  Notification,
  NotificationIcons,
  NotificationMessages,
  NotificationType
} from '../../models/notification.model';
import { SocketEventNameModel } from '../../models/enumeration/socket-event-name.model';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let socketService: SocketService;
  const notification: Notification = {
    source: 'Shohre',
    target: 'CX team',
    notification_type: NotificationType.REMOVE,
    date: '2020-05-27T09:20:39.215Z',
    url: 'http://localhost:4200/notification-info'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [{ provide: SocketService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    socketService = TestBed.inject(SocketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial display with no notification', fakeAsync(() => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of());
    component.ngOnInit();
    component.notifications = [];

    fixture.detectChanges();

    expect(component.notifications).toEqual([]);
    expect(component.notificationStatus).toBeFalse();

    // check no notification text
    const noNotification = fixture.debugElement.query(
      By.css('.no-new-notification')
    );
    expect(noNotification.nativeElement.textContent.trim()).toBe(
      'there is no new notification'
    );
  }));

  it('sets initial data (using async)', fakeAsync(() => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of(notification));
    component.notifications = [];
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.notifications).toEqual([notification]);
    expect(component.notificationStatus).toBeTruthy();
  }));

  it('renders correct number of li', fakeAsync(() => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of(notification));
    component.notifications = [];
    component.ngOnInit();

    fixture.detectChanges();

    const notificationsList = fixture.debugElement.queryAll(By.css('li'));

    expect(notificationsList.length).toEqual(component.notifications.length);
  }));

  it('renders 30 number li of notifications', fakeAsync(() => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of(notification));
    component.notifications = [];
    for (let i = 0; component.notifications.length < 32; i++) {
      component.getNotificationFromWebSocket();
    }

    fixture.detectChanges();

    const notificationsList = fixture.debugElement.queryAll(By.css('li'));

    expect(notificationsList.length).toEqual(30);
  }));

  it('renders proper message base on notification type', () => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of(notification));
    component.notifications = [];
    component.getNotificationFromWebSocket();
    component.renderNotificationMessage(NotificationType.REMOVE);
    fixture.detectChanges();

    const notificationMessage = fixture.debugElement.query(
      By.css('.notification-message')
    ).nativeElement;
    expect(notificationMessage.innerHTML).not.toBeNull();
    expect(notificationMessage.innerHTML.trim()).toBe(
      NotificationMessages.get(NotificationType.REMOVE)
    );
  });

  it('renders proper icon base on notification type', () => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of(notification));
    component.notifications = [];
    component.getNotificationFromWebSocket();
    component.renderNotificationIcon(NotificationType.REMOVE);
    fixture.detectChanges();

    const notificationIcon = fixture.debugElement.query(
      By.css(`.${NotificationIcons.get(NotificationType.REMOVE)}`)
    ).nativeElement;
    expect(notificationIcon).toBeTruthy();
  });

  it('check notification status', fakeAsync(() => {
    spyOn(socketService, 'listen')
      .withArgs(SocketEventNameModel.NOTIFICATION)
      .and.returnValue(of(notification));

    expect(component.notificationStatus).toBeFalse();
    component.getNotificationFromWebSocket();
    fixture.detectChanges();

    expect(component.notificationStatus).toBeTruthy();
    component.checkNewNotifications();
    fixture.detectChanges();
    expect(component.notificationStatus).toBeFalse();
  }));
});
