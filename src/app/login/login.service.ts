import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  Jwttoken:any = "not logged in"
  constructor(private http: HttpClient ) {
  }


  loginRequest(login: Login){
    this.http.post('http://localhost:8080/login', login).subscribe(data => this.Jwttoken = data);

  }

  getJwtTOken(){
    return this.Jwttoken
  }
}
