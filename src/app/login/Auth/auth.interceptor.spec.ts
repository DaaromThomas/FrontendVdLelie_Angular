import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoginService } from '../login.service';

describe('AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let loginService: LoginService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LoginService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        loginService = TestBed.inject(LoginService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add Authorization header with token to the request', () => {
        const token = 'test';

        spyOn(loginService, 'getJwtTOken' as keyof LoginService).and.returnValue(
            token
        );
        httpClient.get('/test').subscribe();

        const httpRequest = httpMock.expectOne('/test');
        expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
        expect(httpRequest.request.headers.get('Authorization')).toBe(
            `Bearer ${token}`
        );
        httpRequest.flush({});
    });

    it('should not add Authorization header to the /login request', () => {
        httpClient.post('/login', {}).subscribe();

        const httpRequest = httpMock.expectOne('/login');
        expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
        httpRequest.flush({});
    });

    it('should not add Authorization header to the /refreshtoken request', () => {
        httpClient.post('/refreshtoken', {}).subscribe();

        const httpRequest = httpMock.expectOne('/refreshtoken');
        expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
        httpRequest.flush({});
    })

});
