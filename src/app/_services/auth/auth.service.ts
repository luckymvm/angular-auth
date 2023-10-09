import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../storage/storage.service";
import {AuthStatus, SignIn, User} from "./auth-service.interface";

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
  public user = signal<User>({} as User);
  public status = signal<AuthStatus>('idle');
  public accessToken = signal<string>('');
  public errors = signal({errorMessage: ''});

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {}

  public signin(credentials: SignIn) {
    const browserId = this.storage.getBrowserId();
    return this.http.post(AUTH_API + 'login',
      {...credentials, fingerprint: browserId}, httpOptions
    );
  }

  public signup(email: string, username: string, password: string) {
    return this.http.post(USER_API + 'login',
      {email, username, password}, httpOptions
    );
  }

  public refresh() {
    const browserId = this.storage.getBrowserId();
    return this.http.post(AUTH_API + 'refresh',
      {fingerprint: browserId}, httpOptions
    );
  }

  public logout() {
    return this.http.post(AUTH_API + 'logout',
      {}, httpOptions
    );

  }
}
