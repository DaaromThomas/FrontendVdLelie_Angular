import { NgModule } from "@angular/core";
import { StockComponent } from "./stock.component";
import { AddPackagePopupComponent } from "./add-package-popup/add-package-popup.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [StockComponent, AddPackagePopupComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [StockComponent, AddPackagePopupComponent],
})
export class StockModule {}
