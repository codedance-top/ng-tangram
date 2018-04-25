(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/coercion', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.pagination = {}),global.ng.core,global.ng.cdk.coercion,global.ng.common));
}(this, (function (exports,core,coercion,common) { 'use strict';

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
    var /** @type {?} */ NT_PAGINATION_CONFIG = new core.InjectionToken('nt-pagination-config');

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
            this.pageChange = new core.EventEmitter();
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
            function (value) { this._config.pageSize = coercion.coerceNumberProperty(value); },
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
            function (value) { this._total = coercion.coerceNumberProperty(value); this._build(); },
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
            function (value) { this._pageIndex = coercion.coerceNumberProperty(value, 1); this._build(); },
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
            this._pageIndex = coercion.coerceNumberProperty(index, 1);
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
            { type: core.Component, args: [{
                        selector: 'nt-pagination, [nt-pagination]',
                        template: "<ul class=\"pagination\"> <li class=\"pagination-previous disabled\" *ngIf=\"pageIndex <= 1\">{{ previousLabel }}</li> <li class=\"pagination-previous\" *ngIf=\"pageIndex > 1\"><a (click)=\"_pageChange(pageIndex - 1)\">{{ previousLabel }}</a></li> <ng-container *ngFor=\"let page of pages\"> <li *ngIf=\"page === pageIndex\" [class.current]=\"page === pageIndex\">{{ page }}</li> <li *ngIf=\"page !== pageIndex && page !== '...'\"><a (click)=\"_pageChange(page)\">{{ page }}</a></li> <li class=\"ellipsis\" *ngIf=\"page === '...'\"></li> </ng-container> <li class=\"pagination-next disabled\" *ngIf=\"pageIndex >= totalPage\">{{ nextLabel }}</li> <li class=\"pagination-next\" *ngIf=\"pageIndex < totalPage\"><a (click)=\"_pageChange(pageIndex + 1)\">{{ nextLabel }}</a></li> </ul> ",
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        NtPaginationComponent.ctorParameters = function () { return [
            { type: NtPaginationConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NT_PAGINATION_CONFIG,] },] },
        ]; };
        NtPaginationComponent.propDecorators = {
            "pageSize": [{ type: core.Input },],
            "previousLabel": [{ type: core.Input },],
            "nextLabel": [{ type: core.Input },],
            "total": [{ type: core.Input },],
            "pageIndex": [{ type: core.Input },],
            "pageChange": [{ type: core.Output },],
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.NtPaginationModule = NtPaginationModule;
    exports.PAGINATION_ELLIPSIS = PAGINATION_ELLIPSIS;
    exports.NtPaginationComponent = NtPaginationComponent;
    exports.NtPaginationConfig = NtPaginationConfig;
    exports.NT_PAGINATION_CONFIG = NT_PAGINATION_CONFIG;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pagination.umd.js.map
