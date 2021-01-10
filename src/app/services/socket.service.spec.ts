import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import SocketMock from 'socket.io-mock';
import { SocketEventNameModel } from '../models/enumeration/socket-event-name.model';
import { Notification, NotificationType } from '../models/notification.model';

describe('SocketService', () => {
  let service: SocketService;

  const newNotification: Notification = {
    source: 'Shohre',
    target: 'CX team',
    notification_type: NotificationType.INVITATIONAL,
    date: '2020-05-27T09:20:39.215Z',
    url: 'http://localhost:4200/notification-info'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService]
    });
    service = TestBed.inject(SocketService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('tests simple connection and messaging works with mock-socket setup', done => {
    const socket = new SocketMock(service.url);
    console.log(socket);
    service.listen(SocketEventNameModel.NOTIFICATION).subscribe(m => {
      expect(m).toEqual(newNotification);
      console.log(m);
    });

    // socket.on(SocketEventNameModel.NOTIFICATION, message => {
    //   expect(message).toEqual(newNotification);
    // });

    socket.socketClient.emit(SocketEventNameModel.NOTIFICATION, 'kk');

    done();
  });
});
