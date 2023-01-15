import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../user/user-login.model';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookie: CookieService) {
    console.log(this.cookie.get("UserToken"));
  }

  login(email: string, password: string) {
    console.log('INSIDE auth service');
    console.log(email);
    console.log(password);

    //Todo connecto to the backend and login
    return this.http.post<UserLogin>('http://localhost:7200/api/login', {
      email: email,
      password: password
    });
  }

  loginViaGoogle(credential: string) {
    console.log('INSIDE loginViaGoogle');
    return this.http.post<UserLogin>('http://localhost:7200/api/login/google/submit', { credential });
  }
}
