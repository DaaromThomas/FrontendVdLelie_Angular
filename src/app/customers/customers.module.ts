import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { SharedModule } from '../shared/shared-module/shared-module.module';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent],
})
export class CustomersModule {}
