import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

/**
 * 文件上传请求服务
 */
import {
    HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpRequest, HttpResponse,
    HttpSentEvent
} from '@angular/common/http';
import { InjectionToken, Injectable, Provider } from '@angular/core';

import { NtUploadStatus } from './upload-status';

export interface NtUploadResult<T> {
  status: NtUploadStatus;
  error?: string;
  data?: T;
}

/**
 * 上传进度处理
 */
export interface NtUploadProgressHandler {

  begin?(event: HttpSentEvent): void;

  progress?(event: HttpProgressEvent): void;

  done?(file?: File): void;
}

export interface NtUploadHandler {
  upload<T>(url: string, file: File, filename: string, handler: NtUploadProgressHandler): Observable<NtUploadResult<T>>;
}

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
      handler.begin(event);
    } else if (event.type === HttpEventType.UploadProgress && handler.progress) {
      handler.progress(event);
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

export const NT_UPLOAD_HANDLER = new InjectionToken<NtUploadHandler>('nt-upload-handler');
