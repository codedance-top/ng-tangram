import { Observable } from 'rxjs';

/**
 * 文件上传请求服务
 */
import { InjectionToken } from '@angular/core';

import { NtUploadResult } from './upload-models';

/**
 * 上传进度处理
 */
export interface NtUploadProgressHandler {

  begin?(): void;

  progress?(percent: number): void;

  done?(file?: File): void;
}

export interface NtUploadHandler {
  upload<T>(url: string, file: File, filename: string, handler: NtUploadProgressHandler): Observable<NtUploadResult<T>>;
}

export const NT_UPLOAD_HANDLER = new InjectionToken<NtUploadHandler>('nt-upload-handler');
