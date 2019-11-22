import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
/**
 * 文件上传请求服务
 */
import { Injectable, InjectionToken } from '@angular/core';

import { NtUploadRef, NtUploadStatus } from './upload-ref';

const REQUEST_PROGRESS = { reportProgress: true };

export class NtUploadResponse<T> {

  constructor(public data: T) { }
}

export class NtUploadError {
  constructor(public file: File | Blob, public error: any) { }
}

export declare type NtUploadEvent<T> = NtUploadResponse<T> | NtUploadError;


@Injectable()
export abstract class NtUploadHandler {

  constructor(private _http: HttpClient) { }

  /**
   * 文件上传
   * @param url 上传 url
   * @param uploadRef 上传任务对象
   */
  upload<T>(url: string, uploadRef: NtUploadRef<T>): Observable<NtUploadEvent<T>> {

    const data = this.getRequestData(uploadRef.file);

    return this._http.request<T>(new HttpRequest('POST', url, data, REQUEST_PROGRESS))
      .pipe(
        map(event => this._progress(event, uploadRef)),
        filter(event => event.type === HttpEventType.Response),
        map((event: HttpResponse<T>) =>
          new NtUploadResponse(this.getResponseData(event.body)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new NtUploadError(uploadRef.file, this.getErrorMessage(error)))
        )
      )
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

  /**
   * 获取文件上传结束错误数据
   * @param error 错误
   */
  protected abstract getErrorMessage(error: HttpErrorResponse): any;
}

@Injectable()
export class NtNoopUploadHandler extends NtUploadHandler {

  protected getRequestData(file: File | Blob) { return file; }

  protected getResponseData<T>(body: any): T { return body; }

  protected getErrorMessage(error: HttpErrorResponse) { return error.statusText; }
}

export const NT_UPLOAD_HANDLER = new InjectionToken<NtUploadHandler>('nt-upload-handler');
