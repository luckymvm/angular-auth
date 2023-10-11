import {computed, Injectable, Signal, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../storage/storage.service";
import {AuthStatus, SignIn, SignUp} from "./auth-service.interface";
import {User} from '../user/user.interface';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

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
  public status = signal<AuthStatus>('idle');
  public accessToken = signal<string>('');
  public errors = signal({errorMessage: ''});
  public successfullyRegistered = signal<boolean>(false);

  readonly isAuthenticated: Signal<boolean> = computed(() => this.status() === 'authenticated');
  readonly isAuthenticating: Signal<boolean> = computed(() => this.status() === 'idle');

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private user: UserService,
    private router: Router
  ) {}

  public signin(credentials: SignIn) {
    const browserId = this.storage.getBrowserId();
    return this.http.post(AUTH_API + 'login',
      {...credentials, fingerprint: browserId}, httpOptions
    ).subscribe({
      next: (data: any) => {
        this.status.set('authenticated');
        this.accessToken.set(data.accessToken);
        this.user.user.set({username: data.username, email: data.email});

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.status.set('unauthenticated');
      }
    });
  }

  public signup(newUser: SignUp) {
    const browserId = this.storage.getBrowserId();
    return this.http.post(USER_API + 'register',
      {...newUser, fingerprint: browserId}, httpOptions
    ).subscribe({
      next: (data: any) => {
        this.successfullyRegistered.set(true);
        this.status.set('authenticated');
        this.accessToken.set(data.accessToken);
        this.user.user.set({username: data.username, email: data.email});

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.status.set('unauthenticated');
      }
    });
  }

  public refresh() {
    const browserId = this.storage.getBrowserId();
    return this.http.post(AUTH_API + 'refresh',
      {fingerprint: browserId}, httpOptions
    );
  }

  public logout() {
    return this.http.post(AUTH_API + 'logout',
      {}, {...httpOptions, responseType: 'text'}
    ).subscribe({
      next: (data: any) => {
        this.status.set('unauthenticated');
        this.accessToken.set('');
        this.user.user.set({} as User);

        this.router.navigate(['/signin']);
      },
      error: (err: any) => {
        console.log(err)
        this.status.set('unauthenticated');
      }
    });
  }
}
