import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from './cookie.service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
