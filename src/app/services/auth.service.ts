import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    console.log('INSIDE auth service');
    console.log(email);
    console.log(password);
    
    //Todo connecto to the backend and login
    return this.http.post('http://localhost:7200/api/login', {
      email: email,
      password: password
    });
  }
}
