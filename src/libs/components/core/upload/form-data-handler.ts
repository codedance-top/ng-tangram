import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import {
    HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NtUploadHandler, NtUploadProgressHandler } from './upload-handler';
import { NtUploadResult, NtUploadStatus } from './upload-models';

@Injectable()
export class NtFormDataUploadHandler implements NtUploadHandler {

  constructor(private _http: HttpClient) { }

  upload<T>(url: string, file: File, filename: string, handler: NtUploadProgressHandler = {}): Observable<NtUploadResult<T>> {

    const formData = this._getFormData(file, filename);

    return this._http.request(new HttpRequest('POST', url, formData, { reportProgress: true }))
      .pipe(
        map(event => this._progressHandler(event, handler)),
        filter(event => event.type === HttpEventType.Response),
        map((event: HttpResponse<any>) => {
          return {
            status: event.status >= 200 && event.status < 400
              ? NtUploadStatus.SUCCESS
              : NtUploadStatus.ERROR,
            data: event.body
          };
        }),
        catchError(error => of({
          status: NtUploadStatus.ERROR,
          error: error.statusText
        }))
      );
  }

  private _progressHandler(event: HttpEvent<any>, handler: NtUploadProgressHandler = {}) {

    if (event.type === HttpEventType.Sent && handler.begin) {
      handler.begin();
    } else if (event.type === HttpEventType.UploadProgress && handler.progress) {
      if (event.total && event.total > 0) {
        handler.progress(Math.round(event.loaded / event.total * 100));
      }
    } else if (event.type === HttpEventType.Response && handler.done) {
      handler.done();
    }
    return event;
  }

  private _getFormData(file: File, filename: string): File | FormData {

    if (filename) {
      const formData = new FormData();
      formData.append(filename, file);
      return formData;
    }
    return file;
  }
}
