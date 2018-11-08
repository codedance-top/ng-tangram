import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * 文件上传请求服务
 */
import {
  HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { NtUploadHandler } from './upload-handler';
import { NT_UPLOAD_INTERCEPTOR, NtUploadInterceptor, NtUploadResult } from './upload-interceptor';

@Injectable()
export class NtUpload {

  constructor(
    private _http: HttpClient,
    @Optional() @Inject(NT_UPLOAD_INTERCEPTOR) private _interceptor: NtUploadInterceptor) { }

  upload<T>(url: string, file: File | FormData, handler: NtUploadHandler = {}): Observable<NtUploadResult<T>> {
    return this._http.request(new HttpRequest('POST', url, file, { reportProgress: true }))
      .pipe(
        map(event => this._progressHandler(event, handler)),
        filter(event => event.type === HttpEventType.Response),
        map((event: HttpResponse<any>) => this._interceptor.response(event))
      );
  }

  private _progressHandler(event: HttpEvent<any>, handler: NtUploadHandler = {}) {

    if (event.type === HttpEventType.Sent && handler.begin) {
      handler.begin(event);
    } else if (event.type === HttpEventType.UploadProgress && handler.progress) {
      handler.progress(event);
    } else if (event.type === HttpEventType.Response && handler.done) {
      handler.done();
    }
    return event;
  }
}
