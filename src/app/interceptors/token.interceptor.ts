import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';
import { Router } from '@angular/router';

const EXCLUDED_URLS = [
  "/auth",
  "/signup"
]

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isExcludedUrl(request.url)) {
      return next.handle(request);
    }

    if (!this.auth.isTokenExpired) {
      request = request.clone({
        headers: request.headers.set('Authorization', this.auth.getToken())
      })
      return next.handle(request);
    } 
    
    return next.handle(request)
    .pipe(
      catchError(
        (err) => {
          this.router.navigate(["/sign"]);
          return throwError(err);
      })
    )
  }

  isExcludedUrl(currentUrl: string): boolean {
    for (const excludedUrl of EXCLUDED_URLS) {
      if (currentUrl.includes(excludedUrl))
        return true;
    }
    return false;
  }
}
