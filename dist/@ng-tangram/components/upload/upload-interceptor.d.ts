import { HttpResponse } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NtUploadStatus } from "./upload-status";
export interface NtUploadResult<T> {
    status: NtUploadStatus;
    error?: string;
    data?: T;
}
export declare class NtUploadInterceptor<T = any> {
    response(res: HttpResponse<any>): NtUploadResult<T>;
    catch(error: HttpErrorResponse): NtUploadResult<T>;
}
export declare const NT_UPLOAD_INTERCEPTOR: InjectionToken<NtUploadInterceptor<any>>;
