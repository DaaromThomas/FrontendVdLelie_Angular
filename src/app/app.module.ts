import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ScanOrderModule} from "./scan-order/scan-order.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from "@angular/common";
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './login/Auth/AuthInterceptor';
import { StockModule } from "./stock/stock.module";
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { ErrorInterceptor } from './errors/global-error/ErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GlobalErrorComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ScanOrderModule,
    LoginModule,
    HttpClientModule,
    StockModule,

  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
