import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms';
import { CreateAccountPopupComponent } from './create-account-popup/create-account-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [AccountsComponent, CreateAccountPopupComponent],
  imports: [CommonModule, BrowserModule, MatTableModule, MatCheckboxModule, FormsModule, MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule ],
  exports: [AccountsComponent],
})
export class AccountsModule {}
