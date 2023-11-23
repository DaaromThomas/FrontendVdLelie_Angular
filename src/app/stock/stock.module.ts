import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { AddProductPopupComponent } from './add-product-popup/add-product-popup.component';

@NgModule({
  declarations: [StockComponent, AddProductPopupComponent],
  imports: [CommonModule],
  exports: [StockComponent, AddProductPopupComponent],
})
export class StockModule {}
