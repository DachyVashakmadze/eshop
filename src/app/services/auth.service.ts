import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../user/user-login.model';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenCookieName = 'user_token';

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  login(email: string, password: string) {
    return this.http.post<UserLogin>('http://localhost:7200/api/login', {
      email: email,
      password: password
    });
  }

  loginViaGoogle(credential: string) {
    return this.http.post<UserLogin>('http://localhost:7200/api/login/google/submit', { credential });
  }

  submitLogin(userLogin: UserLogin) {
    console.log('setting cookie');
    this.cookie.set(this.tokenCookieName, userLogin);
  }

  getToken() {
    const userLogin = this.readCookie();
    if (!userLogin) {
      return null;
    }
    return userLogin.token;
  }

  getUser() {
    const userLogin = this.readCookie();
    if (!userLogin) {
      return null;
    }
    return userLogin.user;
  }

  isLoggedIn() {
    const userLogin = this.readCookie();
    return !!userLogin;
  }

  logout() {
    this.cookie.delete(this.tokenCookieName);
  }

  private readCookie(): UserLogin | null {
    let cookieData = this.cookie.get(this.tokenCookieName);
    if (!cookieData) {
      return null;
    }

    return JSON.parse(cookieData) as UserLogin;
  }
}
