/**
 * 文件上传请求服务
 */
import { HttpClient } from '@angular/common/http';
import { NtUploadHandler } from './upload-handler';
import { NtUploadInterceptor, NtUploadResult } from './upload-interceptor';
import { Observable } from 'rxjs/Observable';
export declare class NtUpload {
    private _http;
    private _interceptor;
    constructor(_http: HttpClient, _interceptor: NtUploadInterceptor);
    upload<T>(url: string, file: File | FormData, handler?: NtUploadHandler): Observable<NtUploadResult<T>>;
    private _progressHandler(event, handler?);
}
