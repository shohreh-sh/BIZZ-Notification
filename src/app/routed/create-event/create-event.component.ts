import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationTypesValue } from '../../models/notification.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.less']
})
export class CreateEventComponent implements OnInit {
  eventCreateForm = new FormGroup({
    target: new FormControl(''),
    source: new FormControl(''),
    notification_type: new FormControl(''),
    date: new FormControl(new Date()),
    url: new FormControl('http://localhost:4200/notification-info')
  });

  constructor(private notificationService: NotificationService) {}

  notificationTypes = NotificationTypesValue;

  ngOnInit(): void {}

  onCreate(): void {
    this.notificationService
      .create(this.eventCreateForm.value)
      .subscribe(res => {
        this.eventCreateForm.get('target').reset();
        this.eventCreateForm.get('source').reset();
        this.eventCreateForm.get('notification_type').reset();
      });
  }
}
