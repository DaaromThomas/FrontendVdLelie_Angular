import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
    let service: CookieService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CookieService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should return empty string when cookie does not exist', () => {
        const cookieService = new CookieService();
        const result = cookieService.getCookie('nonexistent');
        expect(result).toEqual('');
      });
      it('should return value of cookie when it exists', () => {
        const cookieService = new CookieService();
        document.cookie = 'existing=123';
        const result = cookieService.getCookie('existing');
        expect(result).toEqual('123');
      });
      it('should set a cookie with given name, value, and expiration date', () => {
        const cookieService = new CookieService();
        cookieService.setCookie('test', '123', 1);
        const result = document.cookie;
        expect(result).toContain('test=123');
      });
      it('should return empty string when cookie has no value', () => {
        const cookieService = new CookieService();
        document.cookie = 'empty=';
        const result = cookieService.getCookie('empty');
        expect(result).toEqual('');
      });
      it('should return value of cookie when other cookies have no values', () => {
        const cookieService = new CookieService();
        document.cookie = 'empty1=';
        document.cookie = 'empty2=';
        document.cookie = 'value=test';
        const result = cookieService.getCookie('value');
        expect(result).toEqual('test');
      });
    
});
