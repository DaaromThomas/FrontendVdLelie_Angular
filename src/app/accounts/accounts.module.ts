import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CreateAccountPopupComponent } from './create-account-popup/create-account-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoPermissionsForThisComponent } from './no-permissions-for-this/no-permissions-for-this.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [AccountsComponent, NoPermissionsForThisComponent,],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatTableModule,
  ],
  exports: [AccountsComponent],
})
export class AccountsModule { }
