import { Component } from '@angular/core';
import { CookieService } from '../login/cookie.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'] // Use 'styleUrls' with an 's'
})
export class NavBarComponent {

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router, private loginService: LoginService){

}
onLogoutCLick(){
  this.http.post("http://localhost:8080/refreshtoken/delete", this.cookieService.getCookie('refreshToken')).subscribe(data => console.log(data))
  this.router.navigateByUrl('/login')
  this.loginService.Jwttoken = undefined;
}
}