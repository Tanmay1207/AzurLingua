import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(cookieName: string, cookieValue: string, expirationMinutes: number) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (expirationMinutes * 60 * 1000)); // Convert minutes to milliseconds
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  getCookie(cookieName: string): string | null {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }
  
}
