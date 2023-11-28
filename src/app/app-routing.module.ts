import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanOrderComponent } from './scan-order/scan-order.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/Auth/LoginActivate';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'scan-order', component: ScanOrderComponent },
      { path: 'accounts', component: AccountsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
