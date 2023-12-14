import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    if (req.url.includes('/login') || req.url.includes('/refreshtoken')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + this.login.getJwtTOken()
      ),
    });

    return next.handle(authReq);
  }
}
