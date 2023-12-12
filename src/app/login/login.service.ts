import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login.interface';
import { error } from 'console';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken: any;
  wrongPassWordChange: Subject<boolean> = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  loginRequest(login: Login) {
    console.log('login!');
    this.wrongPassWordChange.next(false);
    this.http.post('http://localhost:8080/login', login).subscribe(
      (res) => {
        this.handleRes(res);
      },
      (error) => {
        this.handleRes(error);
      }
    );
  }
  handleRes(res: any) {
    if ((res.status = 200)) {
      this.Jwttoken = res.token;
      console.log('setting cookie');
      this.cookieService.setCookie('refreshToken', res.refreshToken, 1);
    
      
      this.router.navigateByUrl('/scan-order');
    }
    if ((res.status = 401)) {
      this.wrongPassWordChange.next(true);
    }
  }
  isLoggedIn(): boolean {
    if (this.Jwttoken === undefined) {
      return false;
    }
    return true;
  }
  getJwtTOken() {
    return this.Jwttoken;
  }

  askJwtTokenFromRequestToken():any {
   const refreshToken = this.cookieService.getCookie('refreshToken')
   console.log(refreshToken)
    if(refreshToken){
      this.http
      .post('http://localhost:8080/refreshtoken', {
        refreshToken: refreshToken,
      })
      .subscribe((data: any) => {
        if(data != null){
        this.Jwttoken = data.accessToken;
        this.router.navigateByUrl('/scan-order');
        }
      });
  }
    }
  

}
