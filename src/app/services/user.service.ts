import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDefaultResponse, IUser } from '../models/models';
import { AuthService } from '../modules/auth/services/auth.service';
import { IUserEdit } from '../modules/account/models/user-edit.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  restUrl = `${environment.backUrl}/api/users`
  user: BehaviorSubject<IUser | any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  initializeUser(): void {
    if (this.auth.isTokenExists()) {
      this.getCurrentUser();
    }
  }

  getUserIdByToken(): Observable<number> {
    const token = this.auth.decodeToken();
    return token.userId
  }

  getCurrentUser(): void {
    this.http.get(`${this.restUrl}/current`)
    .pipe(
      map(
        (res: any) => {
          if (res) {
            console.log(res);
            this.setUser(res)
          }
        }
      ),
      catchError((err) => {
        if (err.status !== 409) {
          this.onCatchError(err, err.error.message ? err.error.message: "Can't get current user!")
        } 
        return throwError(err);
      })
    )
    .subscribe();
  }

  updateCurrentUser(payload: IUserEdit): Observable<IDefaultResponse> {
    return this.http.patch<IDefaultResponse>(`${this.restUrl}/current`, payload)
    .pipe(
      catchError((err) => 
      this.onCatchError(
        err, err.error.message 
        ? err.error.message
        : "Error occured while updating user data"
      )),
      map(
        (res) => {
          this.getCurrentUser();
          return res;
        }
      )
    )
  }

  updateCurrentUserImage(file: File): void {
    this.deleteCurrentUserImage().subscribe(
      () => this.uploadCurrentUserAvatar(file).subscribe()
    )
  }
  
  deleteCurrentUserImage(): Observable<any> {
    return this.http.delete(`${this.restUrl}/current/image`)
    .pipe(
      catchError((err) => 
        this.onCatchError(
          err, err.error.message 
          ? err.error.message
          : "Error occured while deleting image"
        ))
    ) 
  }

  uploadCurrentUserAvatar(file: File): Observable<any> {
    const payload = new FormData();
    payload.append("file", file);
    return this.http.post(`${this.restUrl}/current/image`, payload)
    .pipe(
      catchError((err) => 
        this.onCatchError(
          err, err.error.message 
          ? err.error.message
          : "Error occured while uploading image"
      )),
      map(
        (res) => {
          this.getCurrentUser();
          return res;
        }
      )
    )
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.restUrl}/${userId}`)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "User data error"))
    )
  }

  isUserAuthrized(): boolean {
    return !!this.user.value;
  }

  setUser(user: IUser | null) {
    this.user.next(user)
  }

  unsetUser(): void {
    this.user.next(null);
  }

  checkRoles(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }
    for (const role of this.user.value.roles) {
      if (roles.includes(role.name)){
        return true;
      }
    }
    return false;
  }

  onCatchError(err: HttpErrorResponse, message: string): Observable<never> {
    notify({ message, type: "error", width: "auto"});
    return throwError(err);
  }
}
