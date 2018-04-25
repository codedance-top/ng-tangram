(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('@ng-tangram/animate/fading'), require('@ng-tangram/components/forms'), require('@ng-tangram/components/upload'), require('rxjs/operators/takeUntil'), require('rxjs/Subject'), require('@angular/common'), require('@ng-tangram/components/icon'), require('@ng-tangram/components/progress')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/animations', '@angular/cdk/coercion', '@angular/core', '@angular/forms', '@ng-tangram/animate/fading', '@ng-tangram/components/forms', '@ng-tangram/components/upload', 'rxjs/operators/takeUntil', 'rxjs/Subject', '@angular/common', '@ng-tangram/components/icon', '@ng-tangram/components/progress'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.file = {}),global.ng.animations,global.ng.cdk.coercion,global.ng.core,global.ng.forms,global.nt.animate.fading,global.nt.components.forms,global.nt.components.upload,global.Rx.operators.takeUntil,global.Rx.Subject,global.ng.common,global.nt.components.icon,global.nt.components.progress));
}(this, (function (exports,animations,coercion,core,forms,fading,forms$1,upload,takeUntil,Subject,common,icon,progress) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ uniqueId = 0;
    var NtFile = /** @class */ (function (_super) {
        __extends(NtFile, _super);
        function NtFile() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "nt-file-" + uniqueId++;
            return _this;
        }
        return NtFile;
    }(upload.NtUploadFile));
    var NtFileComponent = /** @class */ (function (_super) {
        __extends(NtFileComponent, _super);
        function NtFileComponent(uploader, ngControl) {
            var _this = _super.call(this, uploader, ngControl) || this;
            _this._destroy = new Subject.Subject();
            _this._disabled = false;
            _this._required = false;
            _this._autoupload = true;
            _this._value = [];
            _this._maxFiles = 1;
            _this._maxSize = 5;
            _this._accept = ['*'];
            _this.files = [];
            _this.url = '';
            _this.name = '';
            _this.error = new core.EventEmitter();
            _this.remove = new core.EventEmitter();
            return _this;
        }
        Object.defineProperty(NtFileComponent.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFileComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFileComponent.prototype, "required", {
            get: /**
             * @return {?}
             */
            function () { return this._required; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._required = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFileComponent.prototype, "accept", {
            get: /**
             * @return {?}
             */
            function () { return this._accept; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (typeof value === 'string') {
                    this._accept = value.replace(' ', '').split(',');
                }
                else {
                    this._accept = coercion.coerceArray(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFileComponent.prototype, "maxSize", {
            get: /**
             * @return {?}
             */
            function () { return this._maxSize; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxSize = coercion.coerceNumberProperty(value, 5); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFileComponent.prototype, "maxFiles", {
            get: /**
             * @return {?}
             */
            function () { return this._maxFiles; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxFiles = coercion.coerceNumberProperty(value, 1); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFileComponent.prototype, "autoupload", {
            get: /**
             * @return {?}
             */
            function () { return this._autoupload; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._autoupload = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtFileComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        NtFileComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroy.next();
            this._destroy.complete();
            this.error.complete();
            this.remove.complete();
        };
        /**
         * @return {?}
         */
        NtFileComponent.prototype.onTriggerClick = /**
         * @return {?}
         */
        function () {
            if (this.files.length < this.maxFiles) {
                this.fileElement.nativeElement.click();
            }
        };
        /**
         * @return {?}
         */
        NtFileComponent.prototype._fileChanged = /**
         * @return {?}
         */
        function () {
            var _this = this;
            var /** @type {?} */ file = this.fileElement.nativeElement.files[0];
            if (file && this.files.length < this.maxFiles) {
                if (!this._fileSizeValid(file)) {
                    this.error.next(new upload.NtFileSizeError(file, this.maxSize * 1024 * 1024, this.maxSize + "MB"));
                    return;
                }
                if (!this._fileTypeValid(file)) {
                    this.error.next(new upload.NtFileAcceptError(file, file.type));
                    return;
                }
                var /** @type {?} */ ntFile_1 = new NtFile(file.name, file.size, file.type);
                this.files.push(ntFile_1);
                var /** @type {?} */ handlers = {
                    begin: function () { return _this._onUploadBegin(ntFile_1); },
                    progress: function (event) { return _this._onUploadProgress(event, ntFile_1); },
                    done: function () { return _this._onUploadDone(ntFile_1); }
                };
                if (this.autoupload) {
                    ntFile_1.uploader = this._uploader.upload(this.url, this._getFormData(file), handlers)
                        .pipe(takeUntil.takeUntil(this._destroy))
                        .subscribe(function (result) {
                        if ((ntFile_1.status = result.status) === upload.NtUploadStatus.SUCCESS) {
                            ntFile_1.data = result.data;
                            _this._value.push(ntFile_1);
                            _this._onChange(_this._value);
                        }
                    }, function (error) {
                        ntFile_1.status = upload.NtUploadStatus.ERROR;
                        ntFile_1.error = error.statusText;
                        ntFile_1.progress = 100;
                        _this.error.next(new upload.NtFileUploadError(error.status, error.statusText));
                    });
                }
            }
            this._onTouched && this._onTouched();
            this.fileElement.nativeElement.value = '';
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtFileComponent.prototype.removeFile = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            if (this.disabled) {
                return;
            }
            file.uploader && file.uploader.unsubscribe();
            var /** @type {?} */ vindex = this._value.indexOf(file);
            vindex > -1 && this._value.splice(vindex, 1);
            var /** @type {?} */ findex = this.files.indexOf(file);
            findex > -1 && this.files.splice(vindex, 1);
            this.remove.next(file);
            this._onChange(this._value);
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NtFileComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this._disabled = isDisabled;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NtFileComponent.prototype.setValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._value.length = 0;
                (_a = this._value).push.apply(_a, value);
                this.files.length = 0;
                (_b = this.files).push.apply(_b, this._value);
            }
            var _a, _b;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtFileComponent.prototype._fileTypeValid = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            if (file) {
                return this.accept.indexOf(file.type) > -1 || this.accept.indexOf('*') > -1;
            }
            return false;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtFileComponent.prototype._fileSizeValid = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            if (file) {
                return file.size <= this.maxSize * 1024 * 1024;
            }
            return false;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtFileComponent.prototype._onUploadBegin = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            file.status = upload.NtUploadStatus.SENDING;
        };
        /**
         * @param {?} event
         * @param {?} file
         * @return {?}
         */
        NtFileComponent.prototype._onUploadProgress = /**
         * @param {?} event
         * @param {?} file
         * @return {?}
         */
        function (event, file) {
            if (event.total && event.total > 0) {
                file.progress = Math.round(event.loaded / event.total * 100);
            }
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtFileComponent.prototype._onUploadDone = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            file.status = upload.NtUploadStatus.SUCCESS;
        };
        NtFileComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-file',
                        template: "<button class=\"button hollow small nt-file-trigger\" type=\"button\" (click)=\"onTriggerClick()\" [disabled]=\"files.length >= maxFiles || disabled\"> <ng-content></ng-content> </button> <input #fileElement type=\"file\" [accept]=\"accept\" (change)=\"_fileChanged()\"> <div class=\"nt-file-item\" *ngFor=\"let file of files\" [@fadeOut]> <div class=\"nt-file-info\" [class.success]=\"file.status === 2\" [class.error]=\"file.status === 3\" [class.remote]=\"file.status === 4\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp; <a *ngIf=\"file.link\" [href]=\"file.link\" target=\"_blank\">{{file.name}}</a> <ng-container *ngIf=\"!file.link\">{{file.name}}</ng-container> &nbsp;{{ file.size ? '- ' + (file.size / 1000 / 1000).toFixed(2) + 'MB' : '' }} &nbsp;<span class=\"nt-file-error\" *ngIf=\"file.error\">Error&nbsp;-&nbsp;{{file.error}}</span> <div class=\"nt-close-button\" *ngIf=\"!disabled\" (click)=\"removeFile(file)\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress *ngIf=\"file.status === 1\" [@fadeOut] [class.success]=\"file.status === 2\" [class.alert]=\"file.status === 3\" [value]=\"file.progress\" size=\"tiny\"></nt-progress> </div> <!-- <div class=\"nt-file-item\"> <div class=\"nt-file-info\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件0.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> </div> <div class=\"nt-file-item\"> <div class=\"nt-file-info\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件1.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress [@fadeOut] color=\"primary\" value=\"50\" size=\"tiny\"></nt-progress> </div> <div class=\"nt-file-item\"> <div class=\"nt-file-info success\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件2.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress [@fadeOut] color=\"success\" value=\"50\" size=\"tiny\"></nt-progress> </div> <div class=\"nt-file-item\"> <div class=\"nt-file-info error\"> <nt-ant-icon type=\"file1\"></nt-ant-icon>&nbsp;文件3.txt <div class=\"nt-close-button\"><span aria-hidden=\"true\">&times;</span></div> </div> <nt-progress [@fadeOut] color=\"alert\" value=\"50\" size=\"tiny\"></nt-progress> </div> --> ",
                        host: {
                            'class': 'nt-form-control nt-file'
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [
                            { provide: forms$1.NtFormFieldControl, useExisting: NtFileComponent }
                        ],
                        animations: [
                            animations.trigger('fadeOut', [
                                animations.transition('* => void', fading.fadeOut(.3))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtFileComponent.ctorParameters = function () { return [
            { type: upload.NtUpload, },
            { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional },] },
        ]; };
        NtFileComponent.propDecorators = {
            "url": [{ type: core.Input },],
            "name": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "required": [{ type: core.Input },],
            "accept": [{ type: core.Input },],
            "maxSize": [{ type: core.Input },],
            "maxFiles": [{ type: core.Input },],
            "autoupload": [{ type: core.Input },],
            "fileElement": [{ type: core.ViewChild, args: ['fileElement',] },],
            "error": [{ type: core.Output },],
            "remove": [{ type: core.Output },],
        };
        return NtFileComponent;
    }(upload.NtUploadControl));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtFileModule = /** @class */ (function () {
        function NtFileModule() {
        }
        NtFileModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, upload.NtUploadModule, progress.NtProgressModule, icon.NtIconModule],
                        exports: [NtFileComponent],
                        declarations: [NtFileComponent],
                    },] },
        ];
        /** @nocollapse */
        NtFileModule.ctorParameters = function () { return []; };
        return NtFileModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtFileModule = NtFileModule;
    exports.NtFile = NtFile;
    exports.NtFileComponent = NtFileComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=file.umd.js.map
