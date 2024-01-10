import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationPopupComponent } from './email-notification-popup.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EmailNotificationPopupComponent', () => {
  let component: EmailNotificationPopupComponent;
  let fixture: ComponentFixture<EmailNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailNotificationPopupComponent],
      imports: [MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule]
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
