import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login.interface';
import { error } from 'console';
import { DataStorageService } from '../services/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken: any;
  wrongPassWordChange: Subject<boolean> = new Subject<boolean>;
  username: string = '';
  constructor(private http: HttpClient, private router: Router, private dataStorageService: DataStorageService) {}

  loginRequest(login: Login) {
    this.wrongPassWordChange.next(false)
    this.username = login.username;
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
    if(res.status = 200){
      this.Jwttoken = res.token;
      this.dataStorageService.setCurrentUser(this.username);
      this.router.navigateByUrl('/scan-order');
    }
    if(res.status = 401){
      this.wrongPassWordChange.next(true)
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
