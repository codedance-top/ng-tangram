/**
 * 文件上传请求服务
 */

import {
  HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { NtUploadHandler } from './upload-handler';
import { NT_UPLOAD_INTERCEPTOR, NtUploadInterceptor, NtUploadResult } from './upload-interceptor';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class NtUpload {

  constructor(
    private _http: HttpClient,
    @Optional() @Inject(NT_UPLOAD_INTERCEPTOR) private _interceptor: NtUploadInterceptor) { }

  upload<T>(url: string, file: File | FormData, handler: NtUploadHandler = {}): Observable<NtUploadResult<T>> {

    return this._http.request(new HttpRequest('POST', url, file, { reportProgress: true } ))
      .pipe(
        map(event => this._progressHandler(event, handler)),
        filter(event => event.type === HttpEventType.Response),
        map((event : HttpResponse<any>) => this._interceptor.response(event))
      );
  }

  private _progressHandler(event: HttpEvent<any>, handler: NtUploadHandler = {}) {

    if (event.type === HttpEventType.Sent && handler.begin instanceof Function) {
      handler.begin(event);
    } else if (event.type === HttpEventType.UploadProgress && handler.progress instanceof Function) {
      handler.progress(event);
    } else if (event.type === HttpEventType.Response && handler.done instanceof Function) {
      handler.done();
    }
    return event;
  }
}
