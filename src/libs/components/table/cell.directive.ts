import {
  CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell,
  CdkHeaderCellDef
} from '@angular/cdk/table';
import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export class NtColumnSortChange {
  constructor(
    public isUserInput = false,
    public column: string,
    public sort: string) { }
}


/**
 * table 列单元格定义指令
 * @description ntColumnCellDef 将在 > 0.5.x 版本中弃用
 */
@Directive({
  selector: '[ntCellDef], [ntColumnCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: NtCellDefDirective }]
})
export class NtCellDefDirective extends CdkCellDef { }

/**
 * table 头部单元格定义指令
 * @description ntColumnHeaderDef 将在 > 0.5.x 版本中弃用
 */
@Directive({
  selector: '[ntHeaderCellDef], [ntColumnHeaderDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: NtHeaderCellDefDirective }]
})
export class NtHeaderCellDefDirective extends CdkHeaderCellDef { }

/**
 * table 底部单元格定义指令
 * @description ntColumnFooterDef 将在 > 0.5.x 版本中弃用
 */
@Directive({
  selector: '[ntFooterCellDef], [ntColumnFooterDef]',
  providers: [{ provide: CdkFooterCellDef, useExisting: NtFooterCellDefDirective }]
})
export class NtFooterCellDefDirective extends CdkFooterCellDef { }

/**
 * table 列定义指令
 */
@Directive({
  selector: 'nt-column, [nt-column]',
  providers: [{ provide: CdkColumnDef, useExisting: NtColumnDirective }],
})
export class NtColumnDirective extends CdkColumnDef {

  private _sortable = false;

  sort: '' | 'asc' | 'desc' = '';

  @Input('nt-column')
  set ntColumn(value: string) { this.name = value; }

  @Input() name: string;

  @Input() sticky: boolean;

  @Input() stickyEnd: boolean;

  @Input()
  set sortable(value: boolean) { this._sortable = coerceBooleanProperty(value); }
  get sortable() { return this._sortable; }

  _sortChange: EventEmitter<NtColumnSortChange> = new EventEmitter<NtColumnSortChange>();

  /** 排序操作 */
  sorting(isUserInput = false) {
    if (this.sortable) {

      /** 按照 升 -> 降 -> 无 的循环改变排序 */
      if (this.sort === 'asc') {
        this.sort = 'desc';
      } else if (this.sort === 'desc') {
        this.sort = '';
      } else {
        this.sort = 'asc';
      }

      this._sortChange.emit(new NtColumnSortChange(isUserInput, this.name, this.sort));
    }
  }
}

/**
 * table 头部单元格结构指令
 * @description nt-column-header 将在 > 0.5.x 版本中弃用
 * */
@Directive({
  selector: 'nt-header-cell, nt-column-header, th[nt-header-cell], th[nt-column-header]',
  host: {
    'class': 'nt-header-cell',
    '[class.nt-column-sortable]': 'columnDef.sortable',
    '[class.asc]': 'columnDef.sort === "asc"',
    '[class.desc]': 'columnDef.sort === "desc"',
    '(click)': 'columnDef.sorting(true)',
    'role': 'columnheader',
  },
})
export class NtHeaderCellDirective extends CdkHeaderCell {
  constructor(
    public columnDef: CdkColumnDef,
    elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`nt-column-${columnDef.cssClassFriendlyName}`);
  }
}

/**
 * table 底部单元格结构指令
 * @description nt-column-footer 将在 > 0.5.x 版本中弃用
 * */
@Directive({
  selector: 'nt-footer-cell, nt-column-footer, td[nt-footer-cell], td[nt-column-footer]',
  host: {
    'class': 'nt-footer-cell',
    'role': 'gridcell',
  },
})
export class NtFooterCellDirective extends CdkFooterCell {
  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`nt-column-${columnDef.cssClassFriendlyName}`);
  }
}

/**
 * table 单元格结构指令
 * @description nt-column-cell 将在 > 0.5.x 版本中弃用
 */
@Directive({
  selector: 'nt-cell, nt-column-cell, td[nt-cell], td[nt-column-cell]',
  host: {
    'class': 'nt-cell',
    'role': 'gridcell',
  },
})
export class NtCellDirective extends CdkCell {
  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`nt-column-${columnDef.cssClassFriendlyName}`);
  }
}
