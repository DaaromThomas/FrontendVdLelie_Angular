import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationPopupComponent } from './email-notification-popup.component';

describe('EmailNotificationPopupComponent', () => {
  let component: EmailNotificationPopupComponent;
  let fixture: ComponentFixture<EmailNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailNotificationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
