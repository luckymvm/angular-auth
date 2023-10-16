import {inject, Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../_services/auth/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.authService;

    req = req.clone({
      withCredentials: true,
      headers: req.headers.set('Authorization', `Bearer ${authService.accessToken()}`),
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && authService.isAuthenticated()) {
          return this.updateTokens(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  updateTokens(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refresh().pipe(
        switchMap((data: any) => {
          this.isRefreshing = false;
          this.authService.accessToken.set(data.accessToken);
          req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${data.accessToken}`),
          })
          return next.handle(req);
        }),
        catchError((error) => {
          if (error.status === 403) {
            this.authService.logout();
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }
}



export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
