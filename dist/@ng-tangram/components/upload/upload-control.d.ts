import { EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NtUpload } from './upload';
import { NtUploadControlError } from './upload-errors';
import { NtUploadStatus } from './upload-status';
export declare class NtUploadFile<T = any> {
    name: string;
    size: number | undefined;
    type: string | undefined;
    link: string | undefined;
    status: NtUploadStatus;
    error?: string;
    data?: T;
    constructor(name: string, size?: number | undefined, type?: string | undefined, link?: string | undefined);
}
export declare abstract class NtUploadControl<T extends NtUploadFile> extends NtFormFieldControl<T[]> {
    protected _uploader: NtUpload;
    ngControl: NgControl;
    readonly value: T[];
    readonly maxSize: number;
    readonly accept: string | string[];
    readonly url: string;
    readonly files: T[];
    readonly autoupload: boolean;
    readonly error: EventEmitter<NtUploadControlError>;
    readonly remove: EventEmitter<T>;
    name: string;
    protected _onChange: (value: any) => void;
    protected _onTouched: () => void;
    constructor(_uploader: NtUpload, ngControl: NgControl);
    writeValue(value: T[]): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    protected _getFormData(file: File): File | FormData;
    abstract setValue(value: T[]): void;
}
