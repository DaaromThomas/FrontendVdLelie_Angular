import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login.interface';
import { DataStorageService } from '../services/data-storage.service';
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
    private cookieService: CookieService,
    private dataStorageService: DataStorageService
  ) {}

  loginRequest(login: Login) {
    if(!login.password || !login.username ){
      throw new Error('username or password not valid')
    }
    this.wrongPassWordChange.next(false)
    this.cookieService.setCookie('currentUser', login.username, 1);
    this.http.post('http://localhost:8080/login', login).subscribe(
      (res) => {
        this.handleRes(res);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  handleError(error: any) {
    if ((error.status == 401)) {
      this.wrongPassWordChange.next(true);
    }
  }

  handleRes(res: any) {
      this.Jwttoken = res.token;
      this.cookieService.setCookie('refreshToken', res.refreshToken, 1);
      this.router.navigateByUrl('/scan-order');
      this.Jwttoken = res.token;
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

  askJwtTokenFromRequestToken(): void {
    const refreshToken = this.cookieService.getCookie('refreshToken');
    if (refreshToken) {
      this.http
        .post('http://localhost:8080/refreshtoken', {
          refreshToken: refreshToken,
        })
        .subscribe((data: any) => {
          if (data != null) {
            this.Jwttoken = data.accessToken;
            this.router.navigateByUrl('/scan-order');
          }
        });
    }
  }
}
