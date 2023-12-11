import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { CookieService } from './login/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private loginService: LoginService, private cookieService: CookieService){

  }
  isLoggedIn(): boolean{
   return this.loginService.isLoggedIn()
  }
}

export function appInitializer(loginService: LoginService) {
  return () => {
    // Check the refresh token before the route guards
    const refreshToken = loginService.askJwtTokenFromRequestToken();
    console.log(refreshToken)
    if (refreshToken) {
      console.log('Refresh Token:', refreshToken);
    } else {
      console.error('No Refresh Token found!');
    };
  };
}
