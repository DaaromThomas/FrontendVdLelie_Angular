import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AccountsComponent],
  imports: [CommonModule, BrowserModule],
  exports: [AccountsComponent],
})
export class AccountsModule {}
