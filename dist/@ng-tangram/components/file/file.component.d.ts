import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtUpload, NtUploadControl, NtUploadControlError, NtUploadFile } from '@ng-tangram/components/upload';
import { Subscription } from 'rxjs/Subscription';
export declare class NtFile extends NtUploadFile {
    id: string;
    progress?: number;
    uploader?: Subscription;
}
export declare class NtFileComponent extends NtUploadControl<NtFile> implements OnInit, ControlValueAccessor {
    private readonly _destroy;
    private _disabled;
    private _required;
    private _autoupload;
    private _value;
    private _maxFiles;
    private _maxSize;
    private _accept;
    files: NtFile[];
    url: string;
    name: string;
    readonly value: NtFile[];
    disabled: boolean;
    required: boolean;
    accept: string | Array<string>;
    maxSize: number;
    maxFiles: number;
    autoupload: boolean;
    fileElement: ElementRef;
    error: EventEmitter<NtUploadControlError>;
    remove: EventEmitter<NtFile>;
    constructor(uploader: NtUpload, ngControl: NgControl);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onTriggerClick(): void;
    _fileChanged(): void;
    removeFile(file: NtFile): void;
    setDisabledState(isDisabled: boolean): void;
    setValue(value: NtFile[]): void;
    private _fileTypeValid(file);
    private _fileSizeValid(file);
    private _onUploadBegin(file);
    private _onUploadProgress(event, file);
    private _onUploadDone(file);
}
