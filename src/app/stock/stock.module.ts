import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';

@NgModule({
  declarations: [StockComponent],
  imports: [CommonModule],
  exports: [StockComponent],
})
export class StockModule {}
