import { Component } from '@angular/core';
import { CookieService } from '../login/cookie.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}
  onLogoutCLick() {
   var token = this.cookieService.getCookie('refreshToken');
let params = new HttpParams().set("refreshToken",token);
    this.http
      .delete(
        'http://localhost:8080/refreshtoken',
        {params: params}
      ).subscribe(data => console.log(data))
    this.router.navigateByUrl('/login');
    this.loginService.Jwttoken = undefined;
  }
}
