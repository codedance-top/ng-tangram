import { transition, trigger } from '@angular/animations';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Optional, Output, Self, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fadeOut } from '@ng-tangram/animate/fading';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NtFileAcceptError, NtFileSizeError, NtFileUploadError, NtUpload, NtUploadControl, NtUploadFile, NtUploadStatus, NtUploadModule } from '@ng-tangram/components/upload';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtProgressModule } from '@ng-tangram/components/progress';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId = 0;
class NtFile extends NtUploadFile {
    constructor() {
        super(...arguments);
        this.id = `nt-file-${uniqueId++}`;
    }
}
class NtFileComponent extends NtUploadControl {
    /**
     * @param {?} uploader
     * @param {?} ngControl
     */
    constructor(uploader, ngControl) {
        super(uploader, ngControl);
        this._destroy = new Subject();
        this._disabled = false;
        this._required = false;
        this._autoupload = true;
        this._value = [];
        this._maxFiles = 1;
        this._maxSize = 5;
        this._accept = ['*'];
        this.files = [];
        this.url = '';
        this.name = '';
        this.error = new EventEmitter();
        this.remove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    set accept(value) {
        if (typeof value === 'string') {
            this._accept = value.replace(' ', '').split(',');
        }
        else {
            this._accept = coerceArray(value);
        }
    }
    /**
     * @return {?}
     */
    get accept() { return this._accept; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxSize(value) { this._maxSize = coerceNumberProperty(value, 5); }
    /**
     * @return {?}
     */
    get maxSize() { return this._maxSize; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxFiles(value) { this._maxFiles = coerceNumberProperty(value, 1); }
    /**
     * @return {?}
     */
    get maxFiles() { return this._maxFiles; }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoupload(value) { this._autoupload = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get autoupload() { return this._autoupload; }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        this.error.complete();
        this.remove.complete();
    }
    /**
     * @return {?}
     */
    onTriggerClick() {
        if (this.files.length < this.maxFiles) {
            this.fileElement.nativeElement.click();
        }
    }
    /**
     * @return {?}
     */
    _fileChanged() {
        const /** @type {?} */ file = this.fileElement.nativeElement.files[0];
        if (file && this.files.length < this.maxFiles) {
            if (!this._fileSizeValid(file)) {
                this.error.next(new NtFileSizeError(file, this.maxSize * 1024 * 1024, `${this.maxSize}MB`));
                return;
            }
            if (!this._fileTypeValid(file)) {
                this.error.next(new NtFileAcceptError(file, file.type));
                return;
            }
            let /** @type {?} */ ntFile = new NtFile(file.name, file.size, file.type);
            this.files.push(ntFile);
            const /** @type {?} */ handlers = {
                begin: () => this._onUploadBegin(ntFile),
                progress: event => this._onUploadProgress(event, ntFile),
                done: () => this._onUploadDone(ntFile)
            };
            if (this.autoupload) {
                ntFile.uploader = this._uploader.upload(this.url, this._getFormData(file), handlers)
                    .pipe(takeUntil(this._destroy))
                    .subscribe(result => {
                    if ((ntFile.status = result.status) === NtUploadStatus.SUCCESS) {
                        ntFile.data = result.data;
                        this._value.push(ntFile);
                        this._onChange(this._value);
                    }
                }, error => {
                    ntFile.status = NtUploadStatus.ERROR;
                    ntFile.error = error.statusText;
                    ntFile.progress = 100;
                    this.error.next(new NtFileUploadError(error.status, error.statusText));
                });
            }
        }
        this._onTouched && this._onTouched();
        this.fileElement.nativeElement.value = '';
    }
    /**
     * @param {?} file
     * @return {?}
     */
    removeFile(file) {
        if (this.disabled) {
            return;
        }
        file.uploader && file.uploader.unsubscribe();
        const /** @type {?} */ vindex = this._value.indexOf(file);
        vindex > -1 && this._value.splice(vindex, 1);
        const /** @type {?} */ findex = this.files.indexOf(file);
        findex > -1 && this.files.splice(vindex, 1);
        this.remove.next(file);
        this._onChange(this._value);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        if (value) {
            this._value.length = 0;
            this._value.push(...value);
            this.files.length = 0;
            this.files.push(...this._value);
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    _fileTypeValid(file) {
        if (file) {
            return this.accept.indexOf(file.type) > -1 || this.accept.indexOf('*') > -1;
        }
        return false;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    _fileSizeValid(file) {
        if (file) {
            return file.size <= this.maxSize * 1024 * 1024;
        }
        return false;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    _onUploadBegin(file) {
        file.status = NtUploadStatus.SENDING;
    }
    /**
     * @param {?} event
     * @param {?} file
     * @return {?}
     */
    _onUploadProgress(event, file) {
        if (event.total && event.total > 0) {
            file.progress = Math.round(event.loaded / event.total * 100);
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    _onUploadDone(file) {
        file.status = NtUploadStatus.SUCCESS;
    }
}
NtFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-file',
                template: "<button class=\"button hollow small nt-file-trigger\" type=\"button\" (click)=\"onTriggerClick()\" [disabled]=\"files.length >= maxFiles || disabled\"> <ng-content></ng-content> </button> <input #fileElement type=\"file\" [accept]=\"accept\" (change)=\"_fileChanged()\"> <div class=\"nt-file-item\" *ngFor=\"let file of files\" [@fadeOut]> <div class=\"nt-file-info\" [class.success]=\"file.status === 2\" [class.error]=\"file.status === 3\" [class.remote]=\"file.status === 4\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp; <a *ngIf=\"file.link\" [href]=\"file.link\" target=\"_blank\">{{file.name}}</a> <ng-container *ngIf=\"!file.link\">{{file.name}}</ng-container> &nbsp;{{ file.size ? '- ' + (file.size / 1000 / 1000).toFixed(2) + 'MB' : '' }} &nbsp;<span class=\"nt-file-error\" *ngIf=\"file.error\">Error&nbsp;-&nbsp;{{file.error}}</span> <div class=\"nt-close-button\" *ngIf=\"!disabled\" (click)=\"removeFile(file)\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress *ngIf=\"file.status === 1\" [@fadeOut] [class.success]=\"file.status === 2\" [class.alert]=\"file.status === 3\" [value]=\"file.progress\" size=\"tiny\"></nt-progress> </div> <!-- <div class=\"nt-file-item\"> <div class=\"nt-file-info\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件0.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> </div> <div class=\"nt-file-item\"> <div class=\"nt-file-info\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件1.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress [@fadeOut] color=\"primary\" value=\"50\" size=\"tiny\"></nt-progress> </div> <div class=\"nt-file-item\"> <div class=\"nt-file-info success\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件2.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress [@fadeOut] color=\"success\" value=\"50\" size=\"tiny\"></nt-progress> </div> <div class=\"nt-file-item\"> <div class=\"nt-file-info error\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件3.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress [@fadeOut] color=\"alert\" value=\"50\" size=\"tiny\"></nt-progress> </div> --> ",
                host: {
                    'class': 'nt-form-control nt-file'
                },
                encapsulation: ViewEncapsulation.None,
                providers: [
                    { provide: NtFormFieldControl, useExisting: NtFileComponent }
                ],
                animations: [
                    trigger('fadeOut', [
                        transition('* => void', fadeOut(.3))
                    ])
                ]
            },] },
];
/** @nocollapse */
NtFileComponent.ctorParameters = () => [
    { type: NtUpload, },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
];
NtFileComponent.propDecorators = {
    "url": [{ type: Input },],
    "name": [{ type: Input },],
    "disabled": [{ type: Input },],
    "required": [{ type: Input },],
    "accept": [{ type: Input },],
    "maxSize": [{ type: Input },],
    "maxFiles": [{ type: Input },],
    "autoupload": [{ type: Input },],
    "fileElement": [{ type: ViewChild, args: ['fileElement',] },],
    "error": [{ type: Output },],
    "remove": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtFileModule {
}
NtFileModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NtUploadModule, NtProgressModule, NtIconModule],
                exports: [NtFileComponent],
                declarations: [NtFileComponent],
            },] },
];
/** @nocollapse */
NtFileModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtFileModule, NtFile, NtFileComponent };
//# sourceMappingURL=file.js.map
