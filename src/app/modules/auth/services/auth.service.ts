import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthResponse, IRegistryPayload, ILoginPayload, IToken } from '../models/models';
import notify from "devextreme/ui/notify";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  restUrl = `${environment.backUrl}/api/`

  public accessToken: BehaviorSubject<string> = new BehaviorSubject("");
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  initializeToken(): void {
    const token = localStorage.getItem("access_token");
    this.accessToken.next(token ? token : '');
  }

  login(payload: ILoginPayload, rememberMe: boolean = false): Observable<IAuthResponse> {
    return this.http.post<IToken>(`${this.restUrl}auth`, payload)
    .pipe(
      map(
        (res: IToken) => {
          if (res.token) {
            this.accessToken.next(res.token);
            if (rememberMe) {
              localStorage.setItem("access_token", res.token)
            }
            return { status: true, message: "Authorization completed successfully" }
          }
          return { status: true, message: "Unexpected authorization error" }
        }
      ),
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Authorization error"))
    )
  }
  
  registry(payload: IRegistryPayload, rememberMe: boolean = false): Observable<IAuthResponse> {
    return this.http.post<IToken>(`${this.restUrl}signup`, payload)
    .pipe(
      map(
        (res: IToken) => {
          if (res.token) {
            this.accessToken.next(res.token);
            if (rememberMe) {
              localStorage.setItem("access_token", res.token)
            }
            return { status: true, message: "Registration completed successfully" }
          }
          return { status: true, message: "Unexpected registration error" }
        }
      ),
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Registration error"))
    )
  }

  logout(): void {
    localStorage.removeItem("access_token");
    this.accessToken.next("");
    this.router.navigate(['/'])
  }

  isTokenExpired(): boolean {
    return helper.isTokenExpired(this.accessToken.value);
  }

  isTokenExists(): boolean {
    return this.accessToken.value !== '';
  }

  getToken(): string {
    return this.accessToken.value;
  }

  decodeToken(): any {
    return helper.decodeToken(this.accessToken.value);
  }

  onCatchError(err: HttpErrorResponse, message: string): Observable<never> {
    notify({ message, type: "error", width: "auto"});
    return throwError(err);
  }
}
