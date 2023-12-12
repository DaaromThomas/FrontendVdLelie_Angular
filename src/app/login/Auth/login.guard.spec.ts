import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './login.guard';
import { LoginService } from '../login.service';
import { Router, UrlTree } from '@angular/router';
import { CookieService } from '../cookie.service';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let loginService: LoginService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            providers: [LoginService, CookieService],
        });
        guard = TestBed.inject(AuthGuard);
        loginService = TestBed.inject(LoginService);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true when user is logged in', () => {
        spyOn(loginService, 'isLoggedIn').and.returnValue(true);
        const result = guard.canActivate();
        expect(result).toBe(true);
    });

    it('should navigate to login page and return false when user is not logged in', () => {
        spyOn(loginService, 'isLoggedIn').and.returnValue(false);

        spyOn(router, 'navigate');

        const result = guard.canActivate();

        expect(result).toBe(false);

        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});