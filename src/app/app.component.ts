import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private loginService: LoginService){

  }
  isLoggedIn(): boolean{
   return this.loginService.isLoggedIn()
  }
}
