import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from './login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken: any;
  constructor(private http: HttpClient, private router: Router) {}

  loginRequest(login: Login) {
    this.http
      .post('http://localhost:8080/login', login, { observe: 'response' })
      .subscribe((res) => this.handleRes(res));
  }
  handleRes(res: any) {
    this.Jwttoken = res.body.token;
    this.router.navigateByUrl('/scan-order');
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
