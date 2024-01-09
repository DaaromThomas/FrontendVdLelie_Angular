import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '../login.service';
import { GlobalErrorHandler } from '../../ErrorHandling/global-error-handler';
import { LoadingService } from '../../ErrorHandling/loading-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private login: LoginService,
    private globalErrorHandler: GlobalErrorHandler,
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.showLoading();

    if (req.url.includes('/login') || req.url.includes('/refreshtoken')) {
      return next.handle(req).pipe(
        catchError((error) => {
          this.globalErrorHandler.handleError(error);
          return throwError(error);
        }),
        finalize(() => this.loadingService.hideLoading())
      );
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.login.getJwtTOken()),
    });

    return next.handle(authReq).pipe(
      catchError((error) => {
        this.globalErrorHandler.handleError(error);
        return throwError(error);
      }),
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
