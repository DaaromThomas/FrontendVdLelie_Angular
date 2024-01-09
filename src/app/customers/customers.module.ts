import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { SharedModule } from '../shared/shared-module/shared-module.module';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component'

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent, DeleteCustomerComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatButtonModule, MatIconModule],
  exports: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent],
})
export class CustomersModule {}
