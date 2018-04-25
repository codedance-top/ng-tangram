import { ElementRef, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtModal } from '@ng-tangram/components/modal';
import { NtUpload, NtUploadControl, NtUploadControlError, NtUploadFile } from '@ng-tangram/components/upload';
import { Subscription } from 'rxjs/Subscription';
/**
 * 压缩图片
 */
export declare function zipToImage(file: File, option: any): Promise<any>;
export declare const NtPictureAccepts: string[];
export declare class NtPicture extends NtUploadFile {
    id: string;
    progress?: number;
    uploader?: Subscription;
    thumbnail: string;
}
export declare class NtPictureComponent extends NtUploadControl<NtPicture> implements OnInit, ControlValueAccessor {
    private _modal;
    private readonly _destroy;
    private _disabled;
    private _required;
    private _autoupload;
    private _value;
    private _maxFiles;
    private _maxSize;
    private _accept;
    files: NtPicture[];
    url: string;
    name: string;
    readonly value: NtPicture[];
    disabled: boolean;
    required: boolean;
    accept: string | Array<string>;
    maxSize: number;
    maxFiles: number;
    autoupload: boolean;
    fileElement: ElementRef;
    previewTemplate: TemplateRef<any>;
    error: EventEmitter<NtUploadControlError>;
    remove: EventEmitter<NtPicture>;
    constructor(_modal: NtModal, uploader: NtUpload, ngControl: NgControl);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onTriggerClick(): void;
    _fileChanged(): Promise<void>;
    removeFile(file: NtPicture): void;
    preview(file: NtPicture): void;
    setDisabledState(isDisabled: boolean): void;
    setValue(value: NtPicture[]): void;
    private _fileTypeValid(file);
    private _fileSizeValid(file);
    private _onUploadBegin(file);
    private _onUploadProgress(event, file);
    private _onUploadDone(file);
}
