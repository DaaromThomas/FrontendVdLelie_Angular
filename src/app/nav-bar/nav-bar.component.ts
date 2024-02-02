import { Component } from '@angular/core';
import { CookieService } from '../login/cookie.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { environment } from '../../environments/environment';

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
        environment.apiUrl+'/refreshtoken',
        {params: params}
      ).subscribe()
    this.router.navigateByUrl('/login');
    this.loginService.Jwttoken = undefined;
  }
}
