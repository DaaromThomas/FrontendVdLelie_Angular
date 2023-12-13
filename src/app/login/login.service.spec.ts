import { TestBed, tick } from '@angular/core/testing';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Login } from '../interfaces/login.interface';
import { CookieService } from './cookie.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let loginService: LoginService;
  let cookieService: CookieService
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        CookieService,
        Router,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
    cookieService = TestBed.inject(CookieService)
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
    spyOn(loginService, 'handleError').and.callThrough();

    const login: Login = { username: 'test', password: 'wrongPassword' };

    loginService.loginRequest(login);
    const req = httpTestingController.expectOne('http://localhost:8080/login');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(loginService.handleError).toHaveBeenCalled();
    expect(loginService.wrongPassWordChange.next).toHaveBeenCalledWith(true);
  });


  it('should return true if Jwttoken is defined', function () {
    loginService.Jwttoken = 'jwtToken';
    const result = loginService.isLoggedIn();
    expect(result).toBe(true);
  });
  it('should send POST request with refreshToken if it is available', () => {
    spyOn(cookieService, 'getCookie').and.returnValue('refreshToken');
    loginService.askJwtTokenFromRequestToken();
  
    const req = httpTestingController.expectOne('http://localhost:8080/refreshtoken');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ refreshToken: 'refreshToken' });
  
    req.flush({});
  });
  it('should set Jwttoken and navigate to /scan-order if response data is not null', () => {
    spyOn(cookieService, 'getCookie').and.returnValue('refreshToken');
    spyOn(TestBed.inject(Router), 'navigateByUrl');
    loginService.askJwtTokenFromRequestToken();
  
    const req = httpTestingController.expectOne('http://localhost:8080/refreshtoken');
    req.flush({ accessToken: 'accessToken' });
  
    expect(cookieService.getCookie).toHaveBeenCalledWith('refreshToken');
    expect(loginService.Jwttoken).toBe('accessToken');
    expect(TestBed.inject(Router).navigateByUrl).toHaveBeenCalledWith('/scan-order');
  });
  it('should not set Jwttoken or navigate if response data is null', () => {
    spyOn(cookieService, 'getCookie').and.returnValue('refreshToken');
    spyOn(TestBed.inject(Router), 'navigateByUrl');
    loginService.askJwtTokenFromRequestToken();
  
    const req = httpTestingController.expectOne('http://localhost:8080/refreshtoken');
    req.flush(null);
  
    expect(cookieService.getCookie).toHaveBeenCalledWith('refreshToken');
    expect(loginService.Jwttoken).toBeUndefined();
    expect(TestBed.inject(Router).navigateByUrl).not.toHaveBeenCalled();
  });

  it('should throw an error when logging in with an empty username', () => {
    const login: Login = { username: '', password: 'test' };
    expect(() => {
      loginService.loginRequest(login);
    }).toThrowError('username or password not valid');
  });

  it('should throw an error when logging in with an empty password', () => {
    const login: Login = { username: 'test', password: '' };
    expect(() => {
      loginService.loginRequest(login);
    }).toThrowError('username or password not valid');
  });
});
