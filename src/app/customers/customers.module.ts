import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { SharedModule } from '../shared/shared-module/shared-module.module';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatDialogContent} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component'
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent, DeleteCustomerComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatButtonModule, MatDialogContent, MatFormFieldModule, MatIconModule, MatOptionModule, MatSelectModule, FormsModule, MatInputModule, MatMenuModule],
  exports: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent],
})
export class CustomersModule {}
