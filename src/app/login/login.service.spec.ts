import { TestBed, tick } from '@angular/core/testing';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Login } from '../interfaces/login.interface';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should set Jwttoken when login with correct credentials', () => {
    spyOn(loginService, 'handleRes');
    const login: Login = { username: 'test', password: 'test' };
    loginService.loginRequest(login);
    const req = httpTestingController.expectOne('http://localhost:8080/login');
    req.flush({ status: 200, token: 'jwtToken' });
    expect(loginService.handleRes).toHaveBeenCalledWith({
      status: 200,
      token: 'jwtToken',
    });
  });

  it('should emit wrongPassWordChange event when login with incorrect credentials',  () => {
    spyOn(loginService.wrongPassWordChange, 'next');

    const login: Login = { username: 'test', password: 'wrongPassword' };

    loginService.loginRequest(login);
    const req = httpTestingController.expectOne('http://localhost:8080/login');
    req.flush({ status: 401 });
    expect(loginService.wrongPassWordChange.next).toHaveBeenCalledWith(true);
  });


  it('should return true if Jwttoken is defined', function () {
    loginService.Jwttoken = 'jwtToken';
    const result = loginService.isLoggedIn();
    expect(result).toBe(true);
  });


  it('should handle error response with status code other than 200 and 401', function () {
    spyOn(loginService.wrongPassWordChange, 'next');
    const res = { status: 500 };
    loginService.handleRes(res);
    expect(loginService.wrongPassWordChange.next).not.toHaveBeenCalled();
  });

  it('should throw an error when login with empty username', () => {
    const login: Login = { username: '', password: 'test' };
    expect(() => loginService.loginRequest(login)).toThrowError();
  });

  it('should throw an error when login with empty password', () => {
    const login: Login = { username: 'test', password: '' };
    expect(() => loginService.loginRequest(login)).toThrowError();
  });
});
