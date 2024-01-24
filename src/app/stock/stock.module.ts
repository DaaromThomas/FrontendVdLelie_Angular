import { NgModule } from "@angular/core";
import { StockComponent } from "./stock.component";
import { AddPackagePopupComponent } from "./add-package-popup/add-package-popup.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon'
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { StockTableComponent } from './stock-table/stock-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { StockDeletePopupComponent } from './stock-delete-popup/stock-delete-popup.component';

@NgModule({
  declarations: [StockComponent, AddPackagePopupComponent, StockTableComponent, StockDeletePopupComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatIconModule, FormsModule, MatTableModule, MatCardModule,MatFormFieldModule, MatInputModule, MatPaginatorModule],
  exports: [StockComponent, AddPackagePopupComponent],
})
export class StockModule {}
