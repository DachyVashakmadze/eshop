import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserLogin } from '../user/user-login.model';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenCookieName = 'user_token';

  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router) {
    this.user.next(this.getUserFromCookie());
  }

  login(email: string, password: string) {
    return this.http.post<UserLogin>(`${environment.api_host}/api/login`, {
      email: email,
      password: password
    });
  }

  loginViaGoogle(credential: string) {
    return this.http.post<UserLogin>(`${environment.api_host}/api/login/google/submit`, { credential });
  }

  submitLogin(userLogin: UserLogin) {
    this.cookie.set(this.tokenCookieName, userLogin);
    this.user.next(userLogin.user);
    this.router.navigate(['/']);
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
    this.http.post(`${environment.api_host}/api/logout`, {}).subscribe({
      next: () => {
        // Delete cookie after successful logout
        this.cookie.delete(this.tokenCookieName);
        this.user.next(null);
      }
    })
  }

  isLoggedIn() {
    return (this.getToken() !== null);
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
