import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { OrderScreenComponentComponent } from './main-component/order-screen-component/order-screen-component.component';
import { ProductsComponentComponent } from './main-component/order-screen-component/products-component/products-component.component';
import { FilterComponentComponent } from './main-component/order-screen-component/filter-component/filter-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponentComponent,
    OrderScreenComponentComponent,
    ProductsComponentComponent,
    FilterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
