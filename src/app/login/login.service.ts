import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken:any
  constructor(private http: HttpClient ) {
  }


  loginRequest(login: Login){
    this.http.post('http://localhost:8080/login', login).subscribe(data => this.Jwttoken = data);
  }

  isLoggedIn():boolean{
    if(this.Jwttoken === undefined){
      return false;
    }
    return true;
  }
  getJwtTOken(){
    return this.Jwttoken
  }
}
