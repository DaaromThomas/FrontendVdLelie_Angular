import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanOrderComponent } from './scan-order.component';
import { BrowserModule } from "@angular/platform-browser";
import { SelectPackagePopupComponent } from './select-package-popup/select-package-popup.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ScanOrderComponent, SelectPackagePopupComponent],
  imports: [CommonModule, BrowserModule, MatDialogModule, FormsModule, MatFormFieldModule, MatSelectModule],
  exports: [ScanOrderComponent],
})
export class ScanOrderModule { }
