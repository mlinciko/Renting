import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonService {
  restUrl: string = `${environment.backUrl}/api/`;

  constructor(
    private http: HttpClient,
  ) { }

  createSelectSource(url: string): DataSource {
    return new DataSource({
      store: this.createSelectStore(url)
    });
  }

  createSelectStore(
    url: string
  ): CustomStore {
    return new CustomStore({
      load: (options: any): Promise<any> => {
        return this.http
          .get(`${this.restUrl}${url}`)
          .pipe(
            catchError((err) => 
            this.onCatchError(
              err, err.error.message 
              ? err.error.message
              : "Can't get dictionary"
            ))
          )
          .toPromise()
          .then((data: any) => data)
      },
      byKey: (identify: any): Promise<any> => {
        return this.http
          .get(`${this.restUrl}${url}/${identify}`,)
          .toPromise();
      }
    });
  }

  onCatchError(err: HttpErrorResponse, message: string): Observable<never> {
    if (err.status !== 403 && err.status !== 401) {
      notify({ message, type: "error", width: "auto"});
    }
    return throwError(err);
  }
}
