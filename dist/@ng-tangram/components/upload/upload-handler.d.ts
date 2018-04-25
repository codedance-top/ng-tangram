import { HttpSentEvent, HttpProgressEvent } from "@angular/common/http";
/**
 * 上传进度处理
 */
export interface NtUploadHandler {
    begin?(event: HttpSentEvent): void;
    progress?(event: HttpProgressEvent): void;
    done?(file?: File): void;
}
