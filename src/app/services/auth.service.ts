import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin } from '../user/user-login.model';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenCookieName = 'user_token';

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.user.next(this.getUserFromCookie());
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
    this.cookie.set(this.tokenCookieName, userLogin);
    this.user.next(userLogin.user);
  }

  getToken() {
    const userLogin = this.readCookie();
    if (!userLogin) {
      return null;
    }
    return userLogin.token;
  }

  // Todo read host from env, also handle potential errors
  logout() {
    this.http.post('http://localhost:7200/api/logout', {}).subscribe({
      next: () => {
        // Delete cookie after successful logout
        this.cookie.delete(this.tokenCookieName);
        this.user.next(null);
      }
    })
    
  }


  private getUserFromCookie() {
    const userLogin = this.readCookie();
    if (!userLogin) {
      return null;
    }
    return userLogin.user;
  }

  private readCookie(): UserLogin | null {
    let cookieData = this.cookie.get(this.tokenCookieName);
    if (!cookieData) {
      return null;
    }

    return JSON.parse(cookieData) as UserLogin;
  }
}
