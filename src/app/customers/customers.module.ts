import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { SharedModule } from '../shared/shared-module/shared-module.module';
import { ChangeCustomerPrefferedPackagePopupComponent } from './change-customer-preffered-package-popup/change-customer-preffered-package-popup.component';
import {MatDialogContent} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [CustomersComponent, AddCustomerPopupComponent, ChangeCustomerPrefferedPackagePopupComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatDialogContent, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule],
  exports: [CustomersComponent, AddCustomerPopupComponent],
})
export class CustomersModule {}
