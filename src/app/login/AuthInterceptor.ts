import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.includes('/login')){
      return next.handle(req);
    }
    const authToken = this.login.getJwtTOken();

      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+ authToken.token)
      });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
