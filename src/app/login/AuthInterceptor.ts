import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authReq:any = undefined;
  constructor(private login: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.authReq = req.clone()
    const authToken = this.login.getJwtTOken();
    console.log('intercerpt' + authToken.token)
    if(authToken.token !=undefined){

      this.authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+ authToken.token)
      });
    }
    console.log(this.authReq)
    // send cloned request with header to the next handler.
    return next.handle(this.authReq);
  }
}
