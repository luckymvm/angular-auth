import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API: string = 'http://localhost:3000/auth/';
const USER_API: string = 'http://localhost:3000/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, username: string, password: string) {
    return this.http.post(USER_API + 'login',
      {email, username, password}, httpOptions
    );
  }

  signin(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login',
      {username, password}, httpOptions
    );
  }

  logout() {
    return this.http.post(AUTH_API + 'logout',
      {}, httpOptions
    );

  }
}
