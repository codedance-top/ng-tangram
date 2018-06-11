import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { NtUploadStatus } from './upload-status';

export interface NtUploadResult<T> {
  status: NtUploadStatus;
  error?: string;
  data?: T;
}

export class NtUploadInterceptor<T = any> {

  response(res: HttpResponse<any>): NtUploadResult<T> {
    return {
      status: res.status >= 200 && res.status < 400 ? NtUploadStatus.SUCCESS : NtUploadStatus.ERROR,
      data: res.body
    };
  }

  catch(error: HttpErrorResponse): NtUploadResult<T> {
    return {
      status: NtUploadStatus.ERROR,
      error: error.statusText
    };
  }
}

export const NT_UPLOAD_INTERCEPTOR = new InjectionToken<NtUploadInterceptor>('nt-upload-interceptor');
