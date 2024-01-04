import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ScanOrderModule } from './scan-order/scan-order.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, appInitializer } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './login/Auth/auth.interceptor';
import { StockModule } from './stock/stock.module';
import { CustomersModule } from './customers/customers.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './login/login.service';
import { LogsComponent } from './logs/logs.component';
import { LogsModule } from './logs/logs.module';


@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ScanOrderModule,
    LoginModule,
    HttpClientModule,
    StockModule,
    CustomersModule,    
    NoopAnimationsModule,
    LogsModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [LoginService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
