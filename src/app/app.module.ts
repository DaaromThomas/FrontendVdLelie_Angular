import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ScanOrderModule} from "./scan-order/scan-order.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {CommonModule} from "@angular/common";
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './login/Auth/AuthInterceptor';
import { StockModule } from "./stock/stock.module";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
