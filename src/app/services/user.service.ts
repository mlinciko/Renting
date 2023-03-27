import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/models';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  restUrl = `${environment.backUrl}/api/users`
  user: BehaviorSubject<IUser | any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    if (this.auth.isTokenExists()) {
      this.getUser();
    }
  }

  getUserIdByToken(): Observable<number> {
    const token = this.auth.decodeToken();
    return token.userId
  }

  getUser(): void {
    const userId = this.getUserIdByToken();
    this.http.get(`${this.restUrl}/${userId}`)
    .pipe(
      map(
        (res: any) => {
          if (res) {
            this.initUser(res)
          }
        }
      ),
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "User data error"))
    )
    .subscribe();
  }

  isUserAuthrized(): boolean {
    return !!this.user.value.id;
  }

  initUser(user: IUser | null) {
    this.user.next(user)
  }

  onCatchError(err: HttpErrorResponse, message: string): Observable<never> {
    notify({ message, type: "error", width: "auto"});
    return throwError(err);
  }
}
