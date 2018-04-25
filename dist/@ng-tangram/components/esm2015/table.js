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
class NtColumnSortChange {
    /**
     * @param {?=} isUserInput
     * @param {?=} column
     * @param {?=} sort
     */
    constructor(isUserInput = false, column, sort) {
        this.isUserInput = isUserInput;
        this.column = column;
        this.sort = sort;
    }
}
const /** @type {?} */ NT_COLUMN = new InjectionToken('nt-column');
const /** @type {?} */ NT_COLUMN_TABLE = new InjectionToken('nt-column-table');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtColumnHeaderDirective {
    /**
     * @param {?} elementRef
     * @param {?} column
     */
    constructor(elementRef, column) {
        this.elementRef = elementRef;
        this.column = column;
    }
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
NtColumnHeaderDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_COLUMN,] },] },
];
class NtColumnCellDirective {
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
NtColumnCellDirective.ctorParameters = () => [];
class NtColumnCellDefDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NtColumnCellDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[ntColumnCellDef]' },] },
];
/** @nocollapse */
NtColumnCellDefDirective.ctorParameters = () => [
    { type: TemplateRef, },
];
class NtColumnComponent {
    /**
     * @param {?} _table
     * @param {?} _viewContainerRef
     * @param {?} _elementRef
     */
    constructor(_table, _viewContainerRef, _elementRef) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set sortable(value) { this._sortable = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get sortable() { return this._sortable; }
    /**
     * @return {?}
     */
    get text() {
        return this.header && this.header.elementRef.nativeElement.textContent;
    }
    /**
     * 排序操作
     * @param {?=} isUserInput
     * @return {?}
     */
    sorting(isUserInput = false) {
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
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
}
NtColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-column',
                template: `
    <ng-template>
      <ng-content select="nt-column-header"></ng-content>
    </ng-template>
  `,
                providers: [
                    { provide: NT_COLUMN, useExisting: NtColumnComponent }
                ]
            },] },
];
/** @nocollapse */
NtColumnComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_COLUMN_TABLE,] },] },
    { type: ViewContainerRef, },
    { type: ElementRef, },
];
NtColumnComponent.propDecorators = {
    "sortable": [{ type: Input },],
    "name": [{ type: Input },],
    "width": [{ type: Input },],
    "align": [{ type: Input },],
    "template": [{ type: ViewChild, args: [TemplateRef,] },],
    "header": [{ type: ContentChild, args: [NtColumnHeaderDirective,] },],
    "cell": [{ type: ContentChild, args: [NtColumnCellDefDirective,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class NtTableComponent {
    /**
     * @param {?} _ngZone
     * @param {?} _changeDetectorRef
     * @param {?} _element
     */
    constructor(_ngZone, _changeDetectorRef, _element) {
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
        this.columSortChanges = defer(() => {
            if (this._columns) {
                return merge(...this._columns.map(column => column.sortChange));
            }
            return this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.columSortChanges));
        });
    }
    /**
     * @return {?}
     */
    get columns() { return this._columns ? this._columns.toArray() : []; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectable(value) { this._selectable = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get selectable() { return this._selectable; }
    /**
     * @return {?}
     */
    get isAllSelected() { return this._selectionModel.selected.length === this.dataSource.length; }
    /**
     * @return {?}
     */
    get selected() { return this._selectionModel.selected; }
    /**
     * @param {?} change
     * @return {?}
     */
    ngOnChanges(change) {
        if (change && change["dataSource"] && !change["dataSource"].firstChange) {
            this._selectionModel.clear();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._columns.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
            this._resetOptions();
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    selectAll() {
        if (!this.isAllSelected) {
            this._selectionModel.select(...this.dataSource);
        }
        else {
            this._selectionModel.clear();
        }
        this.selectedChange.emit(this._selectionModel.selected);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        const /** @type {?} */ wasSelected = this.checkSelected(item);
        if (wasSelected) {
            this._selectionModel.deselect(item);
        }
        else {
            this._selectionModel.select(item);
        }
        this.selectedChange.emit(this._selectionModel.selected);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    checkSelected(item) {
        return this._selectionModel.isSelected(item);
    }
    /**
     * @param {?=} filter
     * @return {?}
     */
    _clearSort(filter$$1) {
        this._columns
            .filter(column => column.name !== (filter$$1 ? filter$$1.column : ''))
            .forEach(column => column.sort = '');
    }
    /**
     * @return {?}
     */
    _resetOptions() {
        const /** @type {?} */ changedOrDestroyed = merge(this._columns.changes, this._destroy);
        this.columSortChanges
            .pipe(takeUntil(changedOrDestroyed), filter(event => event.isUserInput))
            .subscribe(event => {
            if (!this._multipleSortable) {
                this._clearSort(event);
            }
            this.sortChange.emit(event);
        });
        merge(...this._columns.map(option => option.sortChange))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }
}
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
NtTableComponent.ctorParameters = () => [
    { type: NgZone, },
    { type: ChangeDetectorRef, },
    { type: ElementRef, },
];
NtTableComponent.propDecorators = {
    "class": [{ type: Input },],
    "_columns": [{ type: ContentChildren, args: [NtColumnComponent,] },],
    "dataSource": [{ type: Input },],
    "selectable": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "sortChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtTableModule {
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
NtTableModule.ctorParameters = () => [];

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
