import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanOrderComponent } from './scan-order.component';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [ScanOrderComponent],
  imports: [CommonModule, BrowserModule],
  exports: [ScanOrderComponent],
})
export class ScanOrderModule {}
