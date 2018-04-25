(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('rxjs/observable/defer'), require('rxjs/observable/merge'), require('rxjs/operators'), require('rxjs/Subject'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/coercion', '@angular/cdk/collections', 'rxjs/observable/defer', 'rxjs/observable/merge', 'rxjs/operators', 'rxjs/Subject', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.table = {}),global.ng.core,global.ng.cdk.coercion,global.ng.cdk.collections,global.Rx.observable.defer,global.Rx.observable.merge,global.Rx.operators,global.Rx.Subject,global.ng.common));
}(this, (function (exports,core,coercion,collections,defer,merge,operators,Subject,common) { 'use strict';

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
    var /** @type {?} */ NT_COLUMN = new core.InjectionToken('nt-column');
    var /** @type {?} */ NT_COLUMN_TABLE = new core.InjectionToken('nt-column-table');

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
            { type: core.Directive, args: [{
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
            { type: core.ElementRef, },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NT_COLUMN,] },] },
        ]; };
        return NtColumnHeaderDirective;
    }());
    var NtColumnCellDirective = /** @class */ (function () {
        function NtColumnCellDirective() {
        }
        NtColumnCellDirective.decorators = [
            { type: core.Directive, args: [{
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
            { type: core.Directive, args: [{ selector: '[ntColumnCellDef]' },] },
        ];
        /** @nocollapse */
        NtColumnCellDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef, },
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
            this.sortChange = new core.EventEmitter();
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
            function (value) { this._sortable = coercion.coerceBooleanProperty(value); },
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
            { type: core.Component, args: [{
                        selector: 'nt-column',
                        template: "\n    <ng-template>\n      <ng-content select=\"nt-column-header\"></ng-content>\n    </ng-template>\n  ",
                        providers: [
                            { provide: NT_COLUMN, useExisting: NtColumnComponent }
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtColumnComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NT_COLUMN_TABLE,] },] },
            { type: core.ViewContainerRef, },
            { type: core.ElementRef, },
        ]; };
        NtColumnComponent.propDecorators = {
            "sortable": [{ type: core.Input },],
            "name": [{ type: core.Input },],
            "width": [{ type: core.Input },],
            "align": [{ type: core.Input },],
            "template": [{ type: core.ViewChild, args: [core.TemplateRef,] },],
            "header": [{ type: core.ContentChild, args: [NtColumnHeaderDirective,] },],
            "cell": [{ type: core.ContentChild, args: [NtColumnCellDefDirective,] },],
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
            this._selectionModel = new collections.SelectionModel(true, undefined, false);
            this._multipleSortable = false;
            this._selectable = false;
            this._destroy = new Subject.Subject();
            this.selectedChange = new core.EventEmitter();
            this.sortChange = new core.EventEmitter();
            this.columSortChanges = defer.defer(function () {
                if (_this._columns) {
                    return merge.merge.apply(void 0, _this._columns.map(function (column) { return column.sortChange; }));
                }
                return _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(function () { return _this.columSortChanges; }));
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
            function (value) { this._selectable = coercion.coerceBooleanProperty(value); },
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
            this._columns.changes.pipe(operators.startWith(null), operators.takeUntil(this._destroy)).subscribe(function () {
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
        function (filter) {
            this._columns
                .filter(function (column) { return column.name !== (filter ? filter.column : ''); })
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
            var /** @type {?} */ changedOrDestroyed = merge.merge(this._columns.changes, this._destroy);
            this.columSortChanges
                .pipe(operators.takeUntil(changedOrDestroyed), operators.filter(function (event) { return event.isUserInput; }))
                .subscribe(function (event) {
                if (!_this._multipleSortable) {
                    _this._clearSort(event);
                }
                _this.sortChange.emit(event);
            });
            merge.merge.apply(void 0, this._columns.map(function (option) { return option.sortChange; })).pipe(operators.takeUntil(changedOrDestroyed))
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
            { type: core.Component, args: [{
                        selector: 'nt-table',
                        template: "<table [class]=\"class\"> <thead> <tr> <th class=\"nt-selector-header\" *ngIf=\"selectable\"> <input type=\"checkbox\" (click)=\"selectAll()\" [checked]=\"isAllSelected\"> </th> <th class=\"nt-column-h\" *ngFor=\"let column of columns\" [style.width]=\"column.width\" [style.textAlign]=\"column.align\" [class.hidden]=\"!column.visibled\"> <ng-container *ngTemplateOutlet=\"column.template\"></ng-container> </th> </tr> </thead> <tbody> <tr *ngFor=\"let data of dataSource\"> <ng-container *ngTemplateOutlet=\"dataRow; context: {$implicit: data};\"></ng-container> </tr> </tbody> </table> <ng-template #dataRow let-data> <td class=\"nt-selector-cell\" *ngIf=\"selectable\"> <input type=\"checkbox\" (click)=\"select(data)\" [checked]=\"checkSelected(data)\"> </td> <td *ngFor=\"let column of columns\" [style.textAlign]=\"column.align\" [class.hidden]=\"!column.visibled\"> <ng-container *ngTemplateOutlet=\"column.cell.template; context: {$implicit: data};\"></ng-container> </td> </ng-template> ",
                        encapsulation: core.ViewEncapsulation.None,
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
            { type: core.NgZone, },
            { type: core.ChangeDetectorRef, },
            { type: core.ElementRef, },
        ]; };
        NtTableComponent.propDecorators = {
            "class": [{ type: core.Input },],
            "_columns": [{ type: core.ContentChildren, args: [NtColumnComponent,] },],
            "dataSource": [{ type: core.Input },],
            "selectable": [{ type: core.Input },],
            "selectedChange": [{ type: core.Output },],
            "sortChange": [{ type: core.Output },],
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [
                            common.CommonModule,
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

    exports.NtTableModule = NtTableModule;
    exports.NtTableComponent = NtTableComponent;
    exports.NtColumnSortChange = NtColumnSortChange;
    exports.NT_COLUMN = NT_COLUMN;
    exports.NT_COLUMN_TABLE = NT_COLUMN_TABLE;
    exports.NtColumnHeaderDirective = NtColumnHeaderDirective;
    exports.NtColumnCellDirective = NtColumnCellDirective;
    exports.NtColumnCellDefDirective = NtColumnCellDefDirective;
    exports.NtColumnComponent = NtColumnComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=table.umd.js.map
