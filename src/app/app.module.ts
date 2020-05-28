import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CreateEventComponent } from './routed/create-event/create-event.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationInfoComponent } from './routed/notification-info/notification-info.component';
import { AppComponent } from './app.component';
import {NotificationService} from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    CreateEventComponent,
    NotificationInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
