import { InjectionToken, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPaginationConfig = /** @class */ (function () {
    function NtPaginationConfig() {
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.size = 3;
        this.pageSize = 10;
    }
    return NtPaginationConfig;
}());
var /** @type {?} */ NT_PAGINATION_CONFIG = new InjectionToken('nt-pagination-config');

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

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ PAGINATION_ELLIPSIS = '...';
var NtPaginationComponent = /** @class */ (function () {
    function NtPaginationComponent(defaultConfig) {
        this._config = new NtPaginationConfig();
        this._total = 0;
        this._totalPage = 1;
        this._pageIndex = 1;
        this._pages = [1];
        this.pageChange = new EventEmitter();
        this._config = __assign({}, this._config, defaultConfig || {});
    }
    Object.defineProperty(NtPaginationComponent.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () { return this._config; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "totalPage", {
        get: /**
         * @return {?}
         */
        function () { return this._totalPage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "pages", {
        get: /**
         * @return {?}
         */
        function () { return this._pages; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () { return this.config.pageSize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._config.pageSize = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "previousLabel", {
        get: /**
         * @return {?}
         */
        function () { return this.config.previousLabel; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._config.previousLabel = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "nextLabel", {
        get: /**
         * @return {?}
         */
        function () { return this.config.nextLabel; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._config.nextLabel = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "total", {
        get: /**
         * @return {?}
         */
        function () { return this._total; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._total = coerceNumberProperty(value); this._build(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtPaginationComponent.prototype, "pageIndex", {
        get: /**
         * @return {?}
         */
        function () { return this._pageIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._pageIndex = coerceNumberProperty(value, 1); this._build(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} index
     * @return {?}
     */
    NtPaginationComponent.prototype._pageChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._pageIndex = coerceNumberProperty(index, 1);
        this.pageChange.emit(index);
    };
    /**
     * @return {?}
     */
    NtPaginationComponent.prototype._build = /**
     * @return {?}
     */
    function () {
        this._totalPage = Math.ceil(this.total / this.config.pageSize);
        var /** @type {?} */ pages = [1];
        var /** @type {?} */ start = this.pageIndex - this.config.size, /** @type {?} */
        end = this.pageIndex + this.config.size;
        start = start < 2 ? 2 : start;
        end = end > this.totalPage - 1 ? this.totalPage - 1 : end;
        start - 2 >= 1 && (pages.push(PAGINATION_ELLIPSIS));
        pages = pages.concat(Array(end - start + 1).fill(start).map(function (value, index) { return value + index; }));
        end + 2 <= this.totalPage && (pages.push(PAGINATION_ELLIPSIS));
        this.totalPage > 1 && pages.push(this.totalPage);
        this._pages = pages;
    };
    NtPaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-pagination, [nt-pagination]',
                    template: "<ul class=\"pagination\"> <li class=\"pagination-previous disabled\" *ngIf=\"pageIndex <= 1\">{{ previousLabel }}</li> <li class=\"pagination-previous\" *ngIf=\"pageIndex > 1\"><a (click)=\"_pageChange(pageIndex - 1)\">{{ previousLabel }}</a></li> <ng-container *ngFor=\"let page of pages\"> <li *ngIf=\"page === pageIndex\" [class.current]=\"page === pageIndex\">{{ page }}</li> <li *ngIf=\"page !== pageIndex && page !== '...'\"><a (click)=\"_pageChange(page)\">{{ page }}</a></li> <li class=\"ellipsis\" *ngIf=\"page === '...'\"></li> </ng-container> <li class=\"pagination-next disabled\" *ngIf=\"pageIndex >= totalPage\">{{ nextLabel }}</li> <li class=\"pagination-next\" *ngIf=\"pageIndex < totalPage\"><a (click)=\"_pageChange(pageIndex + 1)\">{{ nextLabel }}</a></li> </ul> ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NtPaginationComponent.ctorParameters = function () { return [
        { type: NtPaginationConfig, decorators: [{ type: Optional }, { type: Inject, args: [NT_PAGINATION_CONFIG,] },] },
    ]; };
    NtPaginationComponent.propDecorators = {
        "pageSize": [{ type: Input },],
        "previousLabel": [{ type: Input },],
        "nextLabel": [{ type: Input },],
        "total": [{ type: Input },],
        "pageIndex": [{ type: Input },],
        "pageChange": [{ type: Output },],
    };
    return NtPaginationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPaginationModule = /** @class */ (function () {
    function NtPaginationModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    NtPaginationModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NtPaginationModule,
            providers: [
                { provide: NT_PAGINATION_CONFIG, useValue: config || new NtPaginationConfig() }
            ]
        };
    };
    NtPaginationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [NtPaginationComponent],
                    declarations: [NtPaginationComponent]
                },] },
    ];
    /** @nocollapse */
    NtPaginationModule.ctorParameters = function () { return []; };
    return NtPaginationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtPaginationModule, PAGINATION_ELLIPSIS, NtPaginationComponent, NtPaginationConfig, NT_PAGINATION_CONFIG };
//# sourceMappingURL=pagination.js.map
