import { InjectionToken, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, Input, Optional, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectorRef, ContentChildren, NgZone, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtColumnSortChange = /** @class */ (function () {
    function NtColumnSortChange(isUserInput, column, sort) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.isUserInput = isUserInput;
        this.column = column;
        this.sort = sort;
    }
    return NtColumnSortChange;
}());
var /** @type {?} */ NT_COLUMN = new InjectionToken('nt-column');
var /** @type {?} */ NT_COLUMN_TABLE = new InjectionToken('nt-column-table');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtColumnHeaderDirective = /** @class */ (function () {
    function NtColumnHeaderDirective(elementRef, column) {
        this.elementRef = elementRef;
        this.column = column;
    }
    NtColumnHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nt-column-header',
                    host: {
                        'class': 'nt-column-header',
                        '[class.nt-column-sortable]': 'column.sortable',
                        '[class.asc]': 'column.sort === "asc"',
                        '[class.desc]': 'column.sort === "desc"',
                        '(click)': 'column.sorting(true)'
                    }
                },] },
    ];
    /** @nocollapse */
    NtColumnHeaderDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_COLUMN,] },] },
    ]; };
    return NtColumnHeaderDirective;
}());
var NtColumnCellDirective = /** @class */ (function () {
    function NtColumnCellDirective() {
    }
    NtColumnCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nt-column-cell',
                    host: {
                        'class': 'nt-column-cell'
                    }
                },] },
    ];
    /** @nocollapse */
    NtColumnCellDirective.ctorParameters = function () { return []; };
    return NtColumnCellDirective;
}());
var NtColumnCellDefDirective = /** @class */ (function () {
    function NtColumnCellDefDirective(template) {
        this.template = template;
    }
    NtColumnCellDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[ntColumnCellDef]' },] },
    ];
    /** @nocollapse */
    NtColumnCellDefDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return NtColumnCellDefDirective;
}());
var NtColumnComponent = /** @class */ (function () {
    function NtColumnComponent(_table, _viewContainerRef, _elementRef) {
        this._table = _table;
        this._viewContainerRef = _viewContainerRef;
        this._elementRef = _elementRef;
        this._sortable = false;
        this.sort = '';
        this.visibled = true;
        this.width = 'auto';
        this.align = 'left';
        this.sortChange = new EventEmitter();
    }
    Object.defineProperty(NtColumnComponent.prototype, "sortable", {
        get: /**
         * @return {?}
         */
        function () { return this._sortable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._sortable = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtColumnComponent.prototype, "text", {
        get: /**
         * @return {?}
         */
        function () {
            return this.header && this.header.elementRef.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    /** 排序操作 */
    /**
     * 排序操作
     * @param {?=} isUserInput
     * @return {?}
     */
    NtColumnComponent.prototype.sorting = /**
     * 排序操作
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        if (this.sortable) {
            /** 按照 升 -> 降 -> 无 的循环改变排序 */
            if (this.sort === 'asc') {
                this.sort = 'desc';
            }
            else if (this.sort === 'desc') {
                this.sort = '';
            }
            else {
                this.sort = 'asc';
            }
            /** 用户操作的操作才会触发事件 */
            this.sortChange.emit(new NtColumnSortChange(isUserInput, this.name, this.sort));
        }
    };
    /**
     * @return {?}
     */
    NtColumnComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
    };
    NtColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-column',
                    template: "\n    <ng-template>\n      <ng-content select=\"nt-column-header\"></ng-content>\n    </ng-template>\n  ",
                    providers: [
                        { provide: NT_COLUMN, useExisting: NtColumnComponent }
                    ]
                },] },
    ];
    /** @nocollapse */
    NtColumnComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_COLUMN_TABLE,] },] },
        { type: ViewContainerRef, },
        { type: ElementRef, },
    ]; };
    NtColumnComponent.propDecorators = {
        "sortable": [{ type: Input },],
        "name": [{ type: Input },],
        "width": [{ type: Input },],
        "align": [{ type: Input },],
        "template": [{ type: ViewChild, args: [TemplateRef,] },],
        "header": [{ type: ContentChild, args: [NtColumnHeaderDirective,] },],
        "cell": [{ type: ContentChild, args: [NtColumnCellDefDirective,] },],
    };
    return NtColumnComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var NtTableComponent = /** @class */ (function () {
    function NtTableComponent(_ngZone, _changeDetectorRef, _element) {
        var _this = this;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._element = _element;
        this.columnComponent = NtColumnComponent;
        this._selectionModel = new SelectionModel(true, undefined, false);
        this._multipleSortable = false;
        this._selectable = false;
        this._destroy = new Subject();
        this.selectedChange = new EventEmitter();
        this.sortChange = new EventEmitter();
        this.columSortChanges = defer(function () {
            if (_this._columns) {
                return merge.apply(void 0, _this._columns.map(function (column) { return column.sortChange; }));
            }
            return _this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(function () { return _this.columSortChanges; }));
        });
    }
    Object.defineProperty(NtTableComponent.prototype, "columns", {
        get: /**
         * @return {?}
         */
        function () { return this._columns ? this._columns.toArray() : []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtTableComponent.prototype, "selectable", {
        get: /**
         * @return {?}
         */
        function () { return this._selectable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._selectable = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtTableComponent.prototype, "isAllSelected", {
        get: /**
         * @return {?}
         */
        function () { return this._selectionModel.selected.length === this.dataSource.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtTableComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () { return this._selectionModel.selected; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} change
     * @return {?}
     */
    NtTableComponent.prototype.ngOnChanges = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change && change["dataSource"] && !change["dataSource"].firstChange) {
            this._selectionModel.clear();
        }
    };
    /**
     * @return {?}
     */
    NtTableComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._columns.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(function () {
            _this._resetOptions();
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * @return {?}
     */
    NtTableComponent.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        if (!this.isAllSelected) {
            (_a = this._selectionModel).select.apply(_a, this.dataSource);
        }
        else {
            this._selectionModel.clear();
        }
        this.selectedChange.emit(this._selectionModel.selected);
        var _a;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NtTableComponent.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ wasSelected = this.checkSelected(item);
        if (wasSelected) {
            this._selectionModel.deselect(item);
        }
        else {
            this._selectionModel.select(item);
        }
        this.selectedChange.emit(this._selectionModel.selected);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NtTableComponent.prototype.checkSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this._selectionModel.isSelected(item);
    };
    /**
     * @param {?=} filter
     * @return {?}
     */
    NtTableComponent.prototype._clearSort = /**
     * @param {?=} filter
     * @return {?}
     */
    function (filter$$1) {
        this._columns
            .filter(function (column) { return column.name !== (filter$$1 ? filter$$1.column : ''); })
            .forEach(function (column) { return column.sort = ''; });
    };
    /**
     * @return {?}
     */
    NtTableComponent.prototype._resetOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ changedOrDestroyed = merge(this._columns.changes, this._destroy);
        this.columSortChanges
            .pipe(takeUntil(changedOrDestroyed), filter(function (event) { return event.isUserInput; }))
            .subscribe(function (event) {
            if (!_this._multipleSortable) {
                _this._clearSort(event);
            }
            _this.sortChange.emit(event);
        });
        merge.apply(void 0, this._columns.map(function (option) { return option.sortChange; })).pipe(takeUntil(changedOrDestroyed))
            .subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * @return {?}
     */
    NtTableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroy.next();
        this._destroy.complete();
    };
    NtTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-table',
                    template: "<table [class]=\"class\"> <thead> <tr> <th class=\"nt-selector-header\" *ngIf=\"selectable\"> <input type=\"checkbox\" (click)=\"selectAll()\" [checked]=\"isAllSelected\"> </th> <th class=\"nt-column-h\" *ngFor=\"let column of columns\" [style.width]=\"column.width\" [style.textAlign]=\"column.align\" [class.hidden]=\"!column.visibled\"> <ng-container *ngTemplateOutlet=\"column.template\"></ng-container> </th> </tr> </thead> <tbody> <tr *ngFor=\"let data of dataSource\"> <ng-container *ngTemplateOutlet=\"dataRow; context: {$implicit: data};\"></ng-container> </tr> </tbody> </table> <ng-template #dataRow let-data> <td class=\"nt-selector-cell\" *ngIf=\"selectable\"> <input type=\"checkbox\" (click)=\"select(data)\" [checked]=\"checkSelected(data)\"> </td> <td *ngFor=\"let column of columns\" [style.textAlign]=\"column.align\" [class.hidden]=\"!column.visibled\"> <ng-container *ngTemplateOutlet=\"column.cell.template; context: {$implicit: data};\"></ng-container> </td> </ng-template> ",
                    encapsulation: ViewEncapsulation.None,
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: NT_COLUMN_TABLE, useExisting: NtTableComponent }
                    ],
                    host: {
                        'class': 'nt-table'
                    }
                },] },
    ];
    /** @nocollapse */
    NtTableComponent.ctorParameters = function () { return [
        { type: NgZone, },
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
    ]; };
    NtTableComponent.propDecorators = {
        "class": [{ type: Input },],
        "_columns": [{ type: ContentChildren, args: [NtColumnComponent,] },],
        "dataSource": [{ type: Input },],
        "selectable": [{ type: Input },],
        "selectedChange": [{ type: Output },],
        "sortChange": [{ type: Output },],
    };
    return NtTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtTableModule = /** @class */ (function () {
    function NtTableModule() {
    }
    NtTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [
                        CommonModule,
                        NtTableComponent,
                        NtColumnComponent,
                        NtColumnCellDirective,
                        NtColumnHeaderDirective,
                        NtColumnCellDefDirective
                    ],
                    declarations: [
                        NtTableComponent,
                        NtColumnComponent,
                        NtColumnCellDirective,
                        NtColumnHeaderDirective,
                        NtColumnCellDefDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    NtTableModule.ctorParameters = function () { return []; };
    return NtTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtTableModule, NtTableComponent, NtColumnSortChange, NT_COLUMN, NT_COLUMN_TABLE, NtColumnHeaderDirective, NtColumnCellDirective, NtColumnCellDefDirective, NtColumnComponent };
//# sourceMappingURL=table.js.map
