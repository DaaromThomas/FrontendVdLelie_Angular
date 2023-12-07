import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { SharedModule } from '../shared/shared-module/shared-module.module';

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [CustomersComponent, AddCustomerPopupComponent],
})
export class CustomersModule {}
