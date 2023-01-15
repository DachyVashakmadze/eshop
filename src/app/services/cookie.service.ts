import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  
  constructor() { }

  get(name: string) {
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(name + '='))?.split('=')[1];
    
      return decodeURIComponent(cookieValue ?  cookieValue : '');
  }

  set(name: string, data: any, maxAge = 60 * 60 * 24 * 10) {
    const cookieValue = encodeURIComponent(data ? JSON.stringify(data) : '');
    document.cookie = `${name}=${cookieValue}; max-age=${maxAge}; path=/; SameSite=Lax`;
  }
}
