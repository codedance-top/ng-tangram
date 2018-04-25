import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, Input,
  Optional, Output, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import { NT_COLUMN, NT_COLUMN_TABLE, NtColumn, NtColumnSortChange, NtColumnTable } from './column';

@Directive({
  selector: 'nt-column-header',
  host: {
    'class': 'nt-column-header',
    '[class.nt-column-sortable]': 'column.sortable',
    '[class.asc]': 'column.sort === "asc"',
    '[class.desc]': 'column.sort === "desc"',
    '(click)': 'column.sorting(true)'
  }
})
export class NtColumnHeaderDirective {
  constructor(
    public elementRef: ElementRef,
    @Optional() @Inject(NT_COLUMN) public column: NtColumn) { }
}

@Directive({
  selector: 'nt-column-cell',
  host: {
    'class': 'nt-column-cell'
  }
})
export class NtColumnCellDirective { }

@Directive({ selector: '[ntColumnCellDef]' })
export class NtColumnCellDefDirective {
  constructor(public template: TemplateRef<any>) { }
}

@Component({
  selector: 'nt-column',
  template: `
    <ng-template>
      <ng-content select="nt-column-header"></ng-content>
    </ng-template>
  `,
  providers: [
    { provide: NT_COLUMN, useExisting: NtColumnComponent }
  ]
})
export class NtColumnComponent implements NtColumn, AfterContentInit {

  private _sortable = false;

  sort: '' | 'asc' | 'desc' = '';

  visibled = true;

  @Input()
  set sortable(value: boolean) { this._sortable = coerceBooleanProperty(value); }
  get sortable() { return this._sortable; }

  get text () {
    return this.header && this.header.elementRef.nativeElement.textContent;
  }

  @Input() name: string;

  @Input() width: number | string = 'auto';

  @Input() align: 'left' | 'center' | 'right' = 'left';

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @ContentChild(NtColumnHeaderDirective) header: NtColumnHeaderDirective;

  @ContentChild(NtColumnCellDefDirective) cell: NtColumnCellDefDirective;

  readonly sortChange: EventEmitter<NtColumnSortChange> = new EventEmitter<NtColumnSortChange>();

  constructor(
    @Optional() @Inject(NT_COLUMN_TABLE) private _table: NtColumnTable,
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef) { }

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

      /** 用户操作的操作才会触发事件 */
      this.sortChange.emit(new NtColumnSortChange(isUserInput, this.name, this.sort));
    }
  }

  ngAfterContentInit() {

  }
}
