import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login.interface';
import { CookieService } from './cookie.service';
import { DataStorageService } from '../services/data-storage.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken: any;
  wrongPassWordChange: Subject<boolean> = new Subject<boolean>();
  baseurl: string = environment.apiUrl;
  expirationTimeInDays: number = 1;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private datastorageservice: DataStorageService,
  ) {}

  loginRequest(login: Login) {
    if(!login.password || !login.username ){
      throw new Error('username or password not valid')
    }
    this.wrongPassWordChange.next(false)
    this.http.post(this.baseurl + '/login', login).subscribe(
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
      this.cookieService.setCookie('refreshToken', res.refreshToken, this.expirationTimeInDays);
      this.router.navigateByUrl('/scan-order');
      this.Jwttoken = res.token;
      this.datastorageservice.setCurrentAccount();
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
        .post(this.baseurl + '/refreshtoken', {
          refreshToken: refreshToken,
        })
        .subscribe((data: any) => {
          if (data != null) {
            this.Jwttoken = data.accessToken;
            this.router.navigateByUrl('/scan-order');
            this.datastorageservice.setCurrentAccount();
          }
        });
    }
  }
}
