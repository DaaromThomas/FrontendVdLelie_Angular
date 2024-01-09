import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { SharedModule } from '../shared/shared-module/shared-module.module';
import { EditCustomerComponent } from './edit-customer/edit-customer/edit-customer.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ChangeCustomerPrefferedPackagePopupComponent } from './change-customer-preffered-package-popup/change-customer-preffered-package-popup.component';
import {MatDialogContent} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component'

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent, ChangeCustomerPrefferedPackagePopupComponent, DeleteCustomerComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatButtonModule, MatDialogContent, MatFormFieldModule, MatIconModule, MatOptionModule, MatSelectModule, FormsModule, MatInputModule],
  exports: [CustomersComponent, AddCustomerPopupComponent, EditCustomerComponent],
})
export class CustomersModule {}
