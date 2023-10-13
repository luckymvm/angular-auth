import {inject, Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../_services/auth/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = inject(AuthService);

    req = req.clone({
      withCredentials: true,
      headers: req.headers.set('Authorization', `Bearer ${authService.accessToken()}`),
    });

    return next.handle(req);
  }
}



export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
