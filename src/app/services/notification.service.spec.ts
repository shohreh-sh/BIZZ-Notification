import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Notification, NotificationType } from '../models/notification.model';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a notification and return it', () => {
    const newNotification: Notification = {
      source: 'Shohre',
      target: 'CX team',
      notification_type: NotificationType.INVITATIONAL,
      date: '2020-05-27T09:20:39.215Z',
      url: 'http://localhost:4200/notification-info'
    };

    service
      .create(newNotification)
      .subscribe(
        data =>
          expect(data).toEqual(
            newNotification,
            'should return the Notification'
          ),
        fail
      );

    // create should have made one request to POST notification
    const req = httpTestingController.expectOne(
      `${service.baseUrl}/create-notification`
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newNotification);

    // Expect server to return the notification after POST
    const expectedResponse = new HttpResponse({
      status: 200,
      body: newNotification
    });
    req.event(expectedResponse);
  });

  it('should turn 404 error into return of the requested notification', () => {
    const newNotification: Notification = {
      source: 'Shohre',
      target: 'CX team',
      notification_type: NotificationType.INVITATIONAL,
      date: '2020-05-27T09:20:39.215Z',
      url: 'http://localhost:4200/notification-info'
    };

    service
      .create(newNotification)
      .subscribe(
        data =>
          expect(data).toEqual(
            newNotification,
            'should return the notification'
          ),
        fail
      );

    const req = httpTestingController.expectOne(
      `${service.baseUrl}/create-notification`
    );

    // respond with a 404 and the error message in the body
    const msg = '404 error';
    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });
});
