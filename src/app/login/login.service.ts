import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from './login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken: any;
  wrongPassWordChange: Subject<boolean> = new Subject<boolean>;
  constructor(private http: HttpClient, private router: Router) {}

  loginRequest(login: Login) {
    if(!login.password || !login.username ){
      //todo fix
      throw new Error('username or password not valid')
    }
    this.wrongPassWordChange.next(false)
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
    if (res.status === 200) {
      this.router.navigateByUrl('/scan-order');
      this.Jwttoken = res.token;
    }
    if (res.status === 401) {
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
}
