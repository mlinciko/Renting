import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../models/address.interface';
import notify from 'devextreme/ui/notify';
import { ISimpleItem } from '../models/simple-item.interface';
import { IHousePayload } from '../models/house-payload.interface';
import { IAppartment } from '../models/appartment.interface';
import { IFamilyHouse } from '../models/family-house.interface';
import { ILand } from '../models/land.interface';
import { IPropertyPayload } from '../models/property-payload.interface';
import { IAnnouncement } from '../models/announcement';

@Injectable()
export class AddAnnouncementService {
  restUrl: string = `${environment.backUrl}/api/`;

  addressId: BehaviorSubject<number> = new BehaviorSubject(0);
  streetId: BehaviorSubject<number> = new BehaviorSubject(0);
  houseId: BehaviorSubject<number> = new BehaviorSubject(0);
  propertyId: BehaviorSubject<number> = new BehaviorSubject(0);
  announcement: BehaviorSubject<IAnnouncement | any> = new BehaviorSubject(null);

  activeForm: BehaviorSubject<string | any> = new BehaviorSubject("address"); 

  constructor(
    private http: HttpClient,
  ) { }

  createAddress(payload: {houseNumber: string, streetId: number}): Observable<IAddress> {
    return this.http.post<IAddress>(`${this.restUrl}addresses`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating address"))
    )
  }

  createRegion(payload: {name: string}): Observable<ISimpleItem> {
    return this.http.post<ISimpleItem>(`${this.restUrl}regions`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating region"))
    )
  }

  createCity(payload: {regionId: number | null, name: string | null}): Observable<ISimpleItem> {
    return this.http.post<ISimpleItem>(`${this.restUrl}cities`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating city"))
    )
  }

  createStreet(payload: {cityId: number | null, name: string | null}): Observable<ISimpleItem> {
    return this.http.post<ISimpleItem>(`${this.restUrl}streets`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating street"))
    )
  }

  createMaterial(payload: {name: string}): Observable<ISimpleItem> {
    return this.http.post<ISimpleItem>(`${this.restUrl}house-materials`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating material"))
    )
  }

  createHouse(payload: IHousePayload, type: "family-houses" | "apartment-houses"): Observable<any> {
    return this.http.post<any>(`${this.restUrl}houses/${type}`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating address"))
    )
  }

  createProperty(payload: IPropertyPayload, endpoint: "housing/apartments" | "housing/family-houses" | "lands"): Observable<IAppartment | IFamilyHouse | ILand> {
    return this.http.post<IAppartment | IFamilyHouse | ILand>(`${this.restUrl}properties/${endpoint}`, payload)
    .pipe(
      catchError((err) => this.onCatchError(err, err.error.message ? err.error.message: "Error occured while creating property"))
    )
  }

  unsetIds(): void {
    this.addressId.next(0);
    this.streetId.next(0);
    this.houseId.next(0);
    this.propertyId.next(0);
    this.announcement.next(null);
  }

  onCatchError(err: HttpErrorResponse, message: string): Observable<never> {
    notify({ message, type: "error", width: "auto"});
    return throwError(err);
  }
}
