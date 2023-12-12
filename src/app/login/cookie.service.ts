import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  getCookie(name: string): string {
    let cookieValue = '';
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, value] = cookie.split('=');
        if (cookieName.trim() === name) {
          cookieValue = value;
          break;
        }
      }
    }

    return cookieValue;
  }

  setCookie(name: string, value: string, expirationDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/;';
    console.log(document.cookie);
  }
}
