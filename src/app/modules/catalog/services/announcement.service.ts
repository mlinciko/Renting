import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAnnouncement } from '../models/announcement';
import { Observable, catchError, throwError } from 'rxjs';
import { AnnouncementType } from '../models/announcement-type';
import { IAnnouncementPayload } from '../models/announcement-payload.interface';
import notify from 'devextreme/ui/notify';

export const announcementServiceFactory = (http: HttpClient, typeUrl: AnnouncementType, isHousing: boolean) => {
  return new AnnouncementService(http, typeUrl, isHousing);
}

@Injectable()
export class AnnouncementService {
  restUrl: string = `${environment.backUrl}/api/announcements`;

  constructor(
    private http: HttpClient,
    @Inject('TYPE_URL') private typeUrl: AnnouncementType,
    @Inject('IS_HOUSING') private isHousing: boolean,
  ) {}

  getAllOpenAnnouncements(keywords?: string): Observable<IAnnouncement[]> {
    return this.http.get<IAnnouncement[]>(`${this.restUrl}/open${keywords ? `/search?keywords=${keywords}` : ''}`)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't get announcements"))
    )
  }

  getAnnouncementsByType(keywords?: string): Observable<IAnnouncement[]> {
    return this.http.get<IAnnouncement[]>(`${this.restUrl}/${this.isHousing ? "housing/" : ""}${this.typeUrl}/open${keywords ? `/search?keywords=${keywords}` : ''}`)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't get announcements"))
    )
  }

  getAnnouncementById(id: number): Observable<IAnnouncement> {
    return this.http.get<IAnnouncement>(`${this.restUrl}/open/${id}`)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't get announcement"))
    )
  }

  getHiddenAnnouncementById(id: number): Observable<IAnnouncement> {
    return this.http.get<IAnnouncement>(`${this.restUrl}/${id}`)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't get announcement"))
    )
  }

  createCommonAnnouncement(payload: IAnnouncementPayload, isHousing: boolean, typeUrl: string): Observable<IAnnouncement> {
    return this.http.post<IAnnouncement>(`${this.restUrl}/${isHousing ? "housing/" : ""}${typeUrl}`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't create announcement"))
    )
  }

  uploadImages(id: number, payload: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(`${this.restUrl}/${id}/images`, payload)
  }

  changeCommonAnnouncement(
    id: number, 
    payload: any, 
    isHousing: boolean, 
    typeUrl: string
  ): Observable<IAnnouncement> {
    return this.http.patch<IAnnouncement>(`${this.restUrl}/${isHousing ? "housing/" : ""}${typeUrl}/${id}`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't change the announcement"))
    )
  }

  getAnnouncementsOfCurrentUser(): Observable<IAnnouncement[]> {
    return this.http.get<IAnnouncement[]>(`${this.restUrl}/owners/current`)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Can't get announcements"))
    )
  }

  onCatchError(err: HttpErrorResponse, message: string): Observable<never> {
    notify({ message, type: "error", width: "auto"});
    return throwError(err);
  }

}
