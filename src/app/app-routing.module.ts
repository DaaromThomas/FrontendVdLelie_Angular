import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanOrderComponent } from './scan-order/scan-order.component';
import { AccountsComponent } from './accounts/accounts.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: 'scan-order', component: ScanOrderComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'stock', component: StockComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
