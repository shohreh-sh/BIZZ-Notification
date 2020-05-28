import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationTypesValue } from '../../models/notification.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.less']
})
export class CreateEventComponent implements OnInit {
  eventCreateForm = new FormGroup({
    target: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    notification_type: new FormControl('', Validators.required),
    date: new FormControl(new Date()),
    url: new FormControl('http://localhost:4200/notification-info')
  });

  constructor(private notificationService: NotificationService) {}

  notificationTypes = NotificationTypesValue;

  ngOnInit(): void {}

  onCreate() {
    if (this.eventCreateForm.valid) {
      return this.notificationService
        .create(this.eventCreateForm.value)
        .subscribe(res => {
          this.eventCreateForm.get('target').setValue('');
          this.eventCreateForm.get('source').setValue('');
          this.eventCreateForm.get('notification_type').setValue('');
        });
    }
  }
}
