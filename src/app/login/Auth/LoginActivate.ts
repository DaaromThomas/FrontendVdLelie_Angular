import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { CookieService } from '../cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
