import { InjectionToken, Inject, Injectable, Optional, NgModule } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const NtUploadStatus = {
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
class NtUploadInterceptor {
    /**
     * @param {?} res
     * @return {?}
     */
    response(res) {
        return {
            status: res.status >= 200 && res.status < 400 ? NtUploadStatus.SUCCESS : NtUploadStatus.ERROR,
            data: res.body
        };
    }
    /**
     * @param {?} error
     * @return {?}
     */
    catch(error) {
        return {
            status: NtUploadStatus.ERROR,
            error: error.statusText
        };
    }
}
const /** @type {?} */ NT_UPLOAD_INTERCEPTOR = new InjectionToken('nt-upload-interceptor');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtUpload {
    /**
     * @param {?} _http
     * @param {?} _interceptor
     */
    constructor(_http, _interceptor) {
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
    upload(url, file, handler = {}) {
        return this._http.request(new HttpRequest('POST', url, file, { reportProgress: true }))
            .pipe(map(event => this._progressHandler(event, handler)), filter(event => event.type === HttpEventType.Response), map((event) => this._interceptor.response(event)));
    }
    /**
     * @param {?} event
     * @param {?=} handler
     * @return {?}
     */
    _progressHandler(event, handler = {}) {
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
    }
}
NtUpload.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NtUpload.ctorParameters = () => [
    { type: HttpClient, },
    { type: NtUploadInterceptor, decorators: [{ type: Optional }, { type: Inject, args: [NT_UPLOAD_INTERCEPTOR,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtUploadModule {
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
NtUploadModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class NtUploadFile {
    /**
     * @param {?} name
     * @param {?=} size
     * @param {?=} type
     * @param {?=} link
     */
    constructor(name, size, type, link) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.link = link;
        this.status = NtUploadStatus.BEGIN;
    }
}
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
class NtUploadControl extends NtFormFieldControl {
    /**
     * @param {?} _uploader
     * @param {?} ngControl
     */
    constructor(_uploader, ngControl) {
        super();
        this._uploader = _uploader;
        this.ngControl = ngControl;
        this._onChange = () => { };
        this._onTouched = () => { };
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value) {
            this.setValue(value);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    _getFormData(file) {
        if (this.name) {
            const /** @type {?} */ formData = new FormData();
            formData.append(this.name, file);
            return formData;
        }
        return file;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtFileAcceptError {
    /**
     * @param {?} file
     * @param {?} fileAccept
     * @param {?=} allowAccepts
     */
    constructor(file, fileAccept, allowAccepts) {
        this.file = file;
        this.fileAccept = fileAccept;
        this.allowAccepts = allowAccepts;
    }
}
class NtFileSizeError {
    /**
     * @param {?} file
     * @param {?} maxSize
     * @param {?=} maxSizeString
     */
    constructor(file, maxSize, maxSizeString) {
        this.file = file;
        this.maxSize = maxSize;
        this.maxSizeString = maxSizeString;
    }
}
class NtFileUploadError {
    /**
     * @param {?} status
     * @param {?} statusText
     */
    constructor(status, statusText) {
        this.status = status;
        this.statusText = statusText;
    }
}

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
