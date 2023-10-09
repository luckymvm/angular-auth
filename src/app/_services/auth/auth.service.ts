import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {SignIn, User} from "./auth-service.interface";

const AUTH_API: string = 'http://localhost:3000/auth/';
const USER_API: string = 'http://localhost:3000/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<User>({} as User);
  isAuth = signal<boolean>(false);
  accessToken = signal<string>('');

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  signin(credentials: SignIn): Observable<any> {
    const browserId = this.storage.getBrowserId();
    return this.http.post(AUTH_API + 'login',
      {...credentials, fingerprint: browserId}, httpOptions
    );
  }

  signup(email: string, username: string, password: string) {
    return this.http.post(USER_API + 'login',
      {email, username, password}, httpOptions
    );
  }

  refresh() {
    const browserId = this.storage.getBrowserId();
    const request = this.http.post(AUTH_API + 'refresh',
      {browserId}, httpOptions
    );

    return request;
  }

  logout() {
    return this.http.post(AUTH_API + 'logout',
      {}, httpOptions
    );

  }
}
