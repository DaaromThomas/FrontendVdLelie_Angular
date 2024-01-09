import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LogsComponent } from './logs.component';

@NgModule({
  declarations: [LogsComponent],
  imports: [CommonModule, HttpClientModule, CommonModule],
  exports: [LogsComponent],
})
export class LogsModule {}