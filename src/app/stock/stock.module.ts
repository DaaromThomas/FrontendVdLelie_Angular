import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { AddPackagePopupComponent } from './add-package-popup/add-package-popup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StockComponent, AddPackagePopupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [StockComponent, AddPackagePopupComponent],
})
export class StockModule {}
