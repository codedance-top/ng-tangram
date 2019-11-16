import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
/**
 * 文件上传请求服务
 */
import { Injectable, InjectionToken } from '@angular/core';

import { NtUploadRef, NtUploadStatus } from './upload-ref';

const REQUEST_PROGRESS = { reportProgress: true };

export interface NtUploadResult<T> {
  status: NtUploadStatus;
  data?: T;
  error?: any;
}

@Injectable()
export abstract class NtUploadHandler {

  constructor(private _http: HttpClient) { }

  /**
   * 文件上传
   * @param url 上传 url
   * @param uploadRef 上传任务对象
   */
  upload<T>(url: string, uploadRef: NtUploadRef<T>): Observable<NtUploadResult<T>> {

    const data = this.getRequestData(uploadRef.file);

    return this._http.request<T>(new HttpRequest('POST', url, data, REQUEST_PROGRESS))
      .pipe(
        map(event => this._progress(event, uploadRef)),
        filter(event => event.type === HttpEventType.Response),
        map((event: HttpResponse<T>) => ({
          status: event.status >= 200 && event.status < 400
            ? NtUploadStatus.SUCCESS
            : NtUploadStatus.ERROR,
          data: this.getResponseData(event.body)
        } as NtUploadResult<T>)),
        catchError(error => of({
          status: NtUploadStatus.ERROR,
          error: error.statusText
        }))
      );
  }

  /**
   * 处理上传任务的进度
   * @param event 上传事件
   * @param uploadRef 上传任务
   */
  private _progress<T>(event: HttpEvent<any>, uploadRef: NtUploadRef<T>) {

    if (event.type === HttpEventType.Sent) {
      /** 开始 */
      uploadRef.status = NtUploadStatus.BEGIN;
    } else if (event.type === HttpEventType.UploadProgress && (event.total && event.total > 0)) {
      /** 进度更新 */
      uploadRef.progress = Math.round(event.loaded / event.total * 100);
    } else if (event.type === HttpEventType.Response) {
      /** 结束 */
      uploadRef.status = NtUploadStatus.UPLOADED;
    }

    return event;
  }

  /**
   * 获取文件上传数据格式
   * @param file 上传文件
   */
  protected abstract getRequestData(file: File | Blob): any;

  /**
   * 获取文件上传结束响应数据
   * @param response 响应数据
   */
  protected abstract getResponseData<T>(body: any): T;
}

@Injectable()
export class NtNoopUploadHandler extends NtUploadHandler {

  protected getRequestData(file: File | Blob) { return file; }

  protected getResponseData<T>(body: any): T { return body; }
}


export const NT_UPLOAD_HANDLER = new InjectionToken<NtUploadHandler>('nt-upload-handler');
