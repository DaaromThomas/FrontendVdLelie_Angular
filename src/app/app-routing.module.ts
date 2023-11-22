import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanOrderComponent } from './scan-order/scan-order.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  { path: 'scan-order', component: ScanOrderComponent },
  { path: 'Accounts', component: AccountsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
