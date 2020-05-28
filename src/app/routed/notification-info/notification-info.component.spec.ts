import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationInfoComponent } from './notification-info.component';
import { CreateEventComponent } from '../create-event/create-event.component';

describe('NotificationInfoComponent', () => {
  let component: NotificationInfoComponent;
  let fixture: ComponentFixture<NotificationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationInfoComponent],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'create-event', component: CreateEventComponent }
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to url', async(
    inject([Router, Location], (router: Router, location: Location) => {
      component.ngOnInit();
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.go-back')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/create-event');
      });
    })
  ));
});
