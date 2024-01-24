import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanOrderComponent } from './scan-order.component';
import { BrowserModule } from "@angular/platform-browser";
import { SelectPackagePopupComponent } from './select-package-popup/select-package-popup.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EmailNotificationPopupComponent } from './select-package-popup/email-notification-popup/email-notification-popup.component';
import { FilterByCustomerPopupComponent } from './filer-by-customer-popup/filter-by-customer-popup.component';
import { CreateAccountPopupComponent } from '../accounts/create-account-popup/create-account-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { NoPermissionsForThisComponent } from '../accounts/no-permissions-for-this/no-permissions-for-this.component';
import { ThisIsYouComponent } from '../accounts/this-is-you/this-is-you.component';

@NgModule({
  declarations: [ScanOrderComponent, SelectPackagePopupComponent, EmailNotificationPopupComponent, CreateAccountPopupComponent, NoPermissionsForThisComponent, ThisIsYouComponent, FilterByCustomerPopupComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [ScanOrderComponent],
})
export class ScanOrderModule { }
