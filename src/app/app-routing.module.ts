import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationInfoComponent} from './routed/notification-info/notification-info.component';
import {CreateEventComponent} from './routed/create-event/create-event.component';


const routes: Routes = [
  { path: '', redirectTo: '/create-event', pathMatch: 'full' },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'notification-info', component: NotificationInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
