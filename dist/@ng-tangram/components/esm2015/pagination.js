import { InjectionToken, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtPaginationConfig {
    constructor() {
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.size = 3;
        this.pageSize = 10;
    }
}
const /** @type {?} */ NT_PAGINATION_CONFIG = new InjectionToken('nt-pagination-config');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ PAGINATION_ELLIPSIS = '...';
class NtPaginationComponent {
    /**
     * @param {?=} defaultConfig
     */
    constructor(defaultConfig) {
        this._config = new NtPaginationConfig();
        this._total = 0;
        this._totalPage = 1;
        this._pageIndex = 1;
        this._pages = [1];
        this.pageChange = new EventEmitter();
        this._config = Object.assign({}, this._config, defaultConfig || {});
    }
    /**
     * @return {?}
     */
    get config() { return this._config; }
    /**
     * @return {?}
     */
    get totalPage() { return this._totalPage; }
    /**
     * @return {?}
     */
    get pages() { return this._pages; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageSize(value) { this._config.pageSize = coerceNumberProperty(value); }
    /**
     * @return {?}
     */
    get pageSize() { return this.config.pageSize; }
    /**
     * @param {?} value
     * @return {?}
     */
    set previousLabel(value) { this._config.previousLabel = value; }
    /**
     * @return {?}
     */
    get previousLabel() { return this.config.previousLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set nextLabel(value) { this._config.nextLabel = value; }
    /**
     * @return {?}
     */
    get nextLabel() { return this.config.nextLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) { this._total = coerceNumberProperty(value); this._build(); }
    /**
     * @return {?}
     */
    get total() { return this._total; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageIndex(value) { this._pageIndex = coerceNumberProperty(value, 1); this._build(); }
    /**
     * @return {?}
     */
    get pageIndex() { return this._pageIndex; }
    /**
     * @param {?} index
     * @return {?}
     */
    _pageChange(index) {
        this._pageIndex = coerceNumberProperty(index, 1);
        this.pageChange.emit(index);
    }
    /**
     * @return {?}
     */
    _build() {
        this._totalPage = Math.ceil(this.total / this.config.pageSize);
        let /** @type {?} */ pages = [1];
        let /** @type {?} */ start = this.pageIndex - this.config.size, /** @type {?} */
        end = this.pageIndex + this.config.size;
        start = start < 2 ? 2 : start;
        end = end > this.totalPage - 1 ? this.totalPage - 1 : end;
        start - 2 >= 1 && (pages.push(PAGINATION_ELLIPSIS));
        pages = pages.concat(Array(end - start + 1).fill(start).map((value, index) => value + index));
        end + 2 <= this.totalPage && (pages.push(PAGINATION_ELLIPSIS));
        this.totalPage > 1 && pages.push(this.totalPage);
        this._pages = pages;
    }
}
NtPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-pagination, [nt-pagination]',
                template: "<ul class=\"pagination\"> <li class=\"pagination-previous disabled\" *ngIf=\"pageIndex <= 1\">{{ previousLabel }}</li> <li class=\"pagination-previous\" *ngIf=\"pageIndex > 1\"><a (click)=\"_pageChange(pageIndex - 1)\">{{ previousLabel }}</a></li> <ng-container *ngFor=\"let page of pages\"> <li *ngIf=\"page === pageIndex\" [class.current]=\"page === pageIndex\">{{ page }}</li> <li *ngIf=\"page !== pageIndex && page !== '...'\"><a (click)=\"_pageChange(page)\">{{ page }}</a></li> <li class=\"ellipsis\" *ngIf=\"page === '...'\"></li> </ng-container> <li class=\"pagination-next disabled\" *ngIf=\"pageIndex >= totalPage\">{{ nextLabel }}</li> <li class=\"pagination-next\" *ngIf=\"pageIndex < totalPage\"><a (click)=\"_pageChange(pageIndex + 1)\">{{ nextLabel }}</a></li> </ul> ",
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
NtPaginationComponent.ctorParameters = () => [
    { type: NtPaginationConfig, decorators: [{ type: Optional }, { type: Inject, args: [NT_PAGINATION_CONFIG,] },] },
];
NtPaginationComponent.propDecorators = {
    "pageSize": [{ type: Input },],
    "previousLabel": [{ type: Input },],
    "nextLabel": [{ type: Input },],
    "total": [{ type: Input },],
    "pageIndex": [{ type: Input },],
    "pageChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtPaginationModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NtPaginationModule,
            providers: [
                { provide: NT_PAGINATION_CONFIG, useValue: config || new NtPaginationConfig() }
            ]
        };
    }
}
NtPaginationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtPaginationComponent],
                declarations: [NtPaginationComponent]
            },] },
];
/** @nocollapse */
NtPaginationModule.ctorParameters = () => [];

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
