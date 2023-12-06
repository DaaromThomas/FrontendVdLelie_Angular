import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CustomersComponent, AddCustomerPopupComponent],
})
export class CustomersModule {}
