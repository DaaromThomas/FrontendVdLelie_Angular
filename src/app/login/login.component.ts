import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from '../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  wrongPassword = false;
  subscription: any;
  showPassword: boolean = false;
  @ViewChild('passwordInput', { static: false })
  passwordInput!: ElementRef;

  login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService) {
    this.subscription = loginService.wrongPassWordChange.subscribe(
      (data) => (this.wrongPassword = data)
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const inputType = this.showPassword ? 'text' : 'password';
    this.passwordInput.nativeElement.type = inputType;
  }

  onClick() {
    this.loginService.loginRequest(this.login.value as Login);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
