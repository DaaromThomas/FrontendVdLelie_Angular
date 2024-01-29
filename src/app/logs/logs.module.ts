import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LogsComponent } from './logs.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [LogsComponent],
  imports: [CommonModule, HttpClientModule, CommonModule, MatSelectModule, FormsModule, MatMenuModule, MatTableModule, MatPaginatorModule],
  exports: [LogsComponent],
})
export class LogsModule {}