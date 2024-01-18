import { NgModule } from "@angular/core";
import { StockComponent } from "./stock.component";
import { AddPackagePopupComponent } from "./add-package-popup/add-package-popup.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [StockComponent, AddPackagePopupComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatIconModule, FormsModule],
  exports: [StockComponent, AddPackagePopupComponent],
})
export class StockModule {}
