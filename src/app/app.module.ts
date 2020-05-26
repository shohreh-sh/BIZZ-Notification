import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CreateEventComponent } from './routed/create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { NotificationInfoComponent } from './routed/notification-info/notification-info.component';
import { NotificationIconComponent } from './components/notification/notification-icon/notification-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationComponent,
    CreateEventComponent,
    EnumToArrayPipe,
    NotificationInfoComponent,
    NotificationIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
