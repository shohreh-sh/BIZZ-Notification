import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Notification,
  NotificationType
} from '../../models/notification.model';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;
  let notificationService: NotificationService;
  const notification: Notification = {
    source: 'Shohre',
    target: 'CX team',
    notification_type: NotificationType.REMOVE,
    date: '2020-05-27T09:20:39.215Z',
    url: 'http://localhost:4200/notification-info'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEventComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: NotificationService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validations', () => {
    component.ngOnInit();

    fixture.detectChanges();
    const form = component.eventCreateForm;

    expect(form.valid).toEqual(false);

    // Source is required
    expect(form.get('source').valid).toEqual(false);
    form.get('source').setValue('Shohre');
    expect(form.get('source').valid).toEqual(true);

    // Target is required
    expect(form.get('target').valid).toEqual(false);
    form.get('target').setValue('CX Team');
    expect(form.get('target').valid).toEqual(true);

    // Notification Types
    expect(form.get('notification_type').valid).toEqual(false);
    form.get('notification_type').setValue(NotificationType.REMOVE);
    expect(form.get('notification_type').valid).toEqual(true);

    fixture.detectChanges();

    expect(form.valid).toEqual(true);
  });

  it('disable and enable button based on form validation', () => {
    fixture.detectChanges();
    const form = component.eventCreateForm;
    const submitBtn = fixture.debugElement.query(By.css(`.submit-btn`))
      .nativeElement;

    expect(form.valid).toEqual(false);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(submitBtn.disabled).toBe(true);
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      form.get('target').setValue('CX Team');
      form.get('source').setValue('Shohre');
      form.get('notification_type').setValue(NotificationType.REMOVE);
      fixture.detectChanges();
      expect(submitBtn.disabled).toBe(false);
    });
  });

  it('submit form and reset it after success', fakeAsync(() => {
    const form = component.eventCreateForm;

    form.get('target').setValue('CX Team');
    form.get('source').setValue('Shohre');
    form.get('notification_type').setValue(NotificationType.REMOVE);
    form.get('date').setValue(new Date());
    form.get('url').setValue('http://localhost:4200/notification-info');
    spyOn(notificationService, 'create')
      .withArgs(form.value)
      .and.returnValue(of(form.value));

    expect(form.valid).toEqual(true);

    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', null);

    expect(form.valid).toEqual(false);
    expect(form.get('source').value).toEqual('');
    expect(form.get('target').value).toEqual('');
    expect(form.get('notification_type').value).toEqual('');
  }));
});
