import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword: boolean = false;
  @ViewChild('passwordInput', { static: false })
  passwordInput!: ElementRef;

  login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService) {}


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const inputType = this.showPassword ? 'text' : 'password';
    this.passwordInput.nativeElement.type = inputType;
  }

  onClick() {
    this.loginService.loginRequest(this.login.value as Login);
  }
}
