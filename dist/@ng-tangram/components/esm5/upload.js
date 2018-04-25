import { InjectionToken, Inject, Injectable, Optional, NgModule } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var NtUploadStatus = {
    BEGIN: 0,
    SENDING: 1,
    SUCCESS: 2,
    ERROR: 3,
    UPLOADED: 4,
};
NtUploadStatus[NtUploadStatus.BEGIN] = "BEGIN";
NtUploadStatus[NtUploadStatus.SENDING] = "SENDING";
NtUploadStatus[NtUploadStatus.SUCCESS] = "SUCCESS";
NtUploadStatus[NtUploadStatus.ERROR] = "ERROR";
NtUploadStatus[NtUploadStatus.UPLOADED] = "UPLOADED";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
NtUploadInterceptor = /** @class */ (function () {
    function NtUploadInterceptor() {
    }
    /**
     * @param {?} res
     * @return {?}
     */
    NtUploadInterceptor.prototype.response = /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        return {
            status: res.status >= 200 && res.status < 400 ? NtUploadStatus.SUCCESS : NtUploadStatus.ERROR,
            data: res.body
        };
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NtUploadInterceptor.prototype.catch = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return {
            status: NtUploadStatus.ERROR,
            error: error.statusText
        };
    };
    return NtUploadInterceptor;
}());
var /** @type {?} */ NT_UPLOAD_INTERCEPTOR = new InjectionToken('nt-upload-interceptor');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtUpload = /** @class */ (function () {
    function NtUpload(_http, _interceptor) {
        this._http = _http;
        this._interceptor = _interceptor;
    }
    /**
     * @template T
     * @param {?} url
     * @param {?} file
     * @param {?=} handler
     * @return {?}
     */
    NtUpload.prototype.upload = /**
     * @template T
     * @param {?} url
     * @param {?} file
     * @param {?=} handler
     * @return {?}
     */
    function (url, file, handler) {
        var _this = this;
        if (handler === void 0) { handler = {}; }
        return this._http.request(new HttpRequest('POST', url, file, { reportProgress: true }))
            .pipe(map(function (event) { return _this._progressHandler(event, handler); }), filter(function (event) { return event.type === HttpEventType.Response; }), map(function (event) { return _this._interceptor.response(event); }));
    };
    /**
     * @param {?} event
     * @param {?=} handler
     * @return {?}
     */
    NtUpload.prototype._progressHandler = /**
     * @param {?} event
     * @param {?=} handler
     * @return {?}
     */
    function (event, handler) {
        if (handler === void 0) { handler = {}; }
        if (event.type === HttpEventType.Sent && handler.begin instanceof Function) {
            handler.begin(event);
        }
        else if (event.type === HttpEventType.UploadProgress && handler.progress instanceof Function) {
            handler.progress(event);
        }
        else if (event.type === HttpEventType.Response && handler.done instanceof Function) {
            handler.done();
        }
        return event;
    };
    NtUpload.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NtUpload.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: NtUploadInterceptor, decorators: [{ type: Optional }, { type: Inject, args: [NT_UPLOAD_INTERCEPTOR,] },] },
    ]; };
    return NtUpload;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtUploadModule = /** @class */ (function () {
    function NtUploadModule() {
    }
    NtUploadModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: NT_UPLOAD_INTERCEPTOR, useClass: NtUploadInterceptor },
                        NtUpload
                    ],
                },] },
    ];
    /** @nocollapse */
    NtUploadModule.ctorParameters = function () { return []; };
    return NtUploadModule;
}());

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
/**
 * @template T
 */
var  /**
 * @template T
 */
NtUploadFile = /** @class */ (function () {
    function NtUploadFile(name, size, type, link) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.link = link;
        this.status = NtUploadStatus.BEGIN;
    }
    return NtUploadFile;
}());
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var  
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
NtUploadControl = /** @class */ (function (_super) {
    __extends(NtUploadControl, _super);
    function NtUploadControl(_uploader, ngControl) {
        var _this = _super.call(this) || this;
        _this._uploader = _uploader;
        _this.ngControl = ngControl;
        _this._onChange = function () { };
        _this._onTouched = function () { };
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NtUploadControl.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.setValue(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NtUploadControl.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NtUploadControl.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NtUploadControl.prototype._getFormData = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (this.name) {
            var /** @type {?} */ formData = new FormData();
            formData.append(this.name, file);
            return formData;
        }
        return file;
    };
    return NtUploadControl;
}(NtFormFieldControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtFileAcceptError = /** @class */ (function () {
    function NtFileAcceptError(file, fileAccept, allowAccepts) {
        this.file = file;
        this.fileAccept = fileAccept;
        this.allowAccepts = allowAccepts;
    }
    return NtFileAcceptError;
}());
var NtFileSizeError = /** @class */ (function () {
    function NtFileSizeError(file, maxSize, maxSizeString) {
        this.file = file;
        this.maxSize = maxSize;
        this.maxSizeString = maxSizeString;
    }
    return NtFileSizeError;
}());
var NtFileUploadError = /** @class */ (function () {
    function NtFileUploadError(status, statusText) {
        this.status = status;
        this.statusText = statusText;
    }
    return NtFileUploadError;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtUpload, NtUploadModule, NtUploadFile, NtUploadControl, NtUploadStatus, NtFileAcceptError, NtFileSizeError, NtFileUploadError, NtUploadInterceptor, NT_UPLOAD_INTERCEPTOR };
//# sourceMappingURL=upload.js.map
