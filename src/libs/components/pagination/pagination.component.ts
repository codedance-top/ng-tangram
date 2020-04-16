import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { NT_PAGINATION_CONFIG, NtPaginationConfig } from './pagination-config';

export const PAGINATION_ELLIPSIS = '...';

@Component({
  selector: 'nt-pagination, [nt-pagination]',
  templateUrl: 'pagination.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NtPaginationComponent {

  private _options = new NtPaginationConfig();

  private _totalPage = 1;

  private _pages: any[] = [1];

  @Input()
  get options() { return this._options; }
  set options(value: NtPaginationConfig) {
    if (typeof value === 'object') {
      this._options = Object.assign(this._options, value);
    }
  }

  get totalPage() { return this._totalPage; }
  get pages() { return this._pages; }

  @Input()
  set pageSize(value: number) { this._options.pageSize = coerceNumberProperty(value); }
  get pageSize() { return this.options.pageSize; }

  @Input()
  set previousLabel(value: string) { this._options.previousLabel = value; }
  get previousLabel() { return this.options.previousLabel; }

  @Input()
  set nextLabel(value: string) { this._options.nextLabel = value; }
  get nextLabel() { return this.options.nextLabel; }

  private _total = 0;

  @Input()
  set total(value: number) { this._total = coerceNumberProperty(value); this._build(); }
  get total() { return this._total; }

  private _pageIndex = 1;

  @Input()
  set pageIndex(value: number) { this._pageIndex = coerceNumberProperty(value, 1); this._build(); }
  get pageIndex() { return this._pageIndex; }

  @Output() pageChange = new EventEmitter<number>();

  constructor(@Optional() @Inject(NT_PAGINATION_CONFIG) defaultConfig?: NtPaginationConfig) {
    this._options = { ...this._options, ...defaultConfig || {} };
  }

  _pageChange(index: number) {
    this._pageIndex = coerceNumberProperty(index, 1);
    this.pageChange.emit(index);
  }

  private _build() {

    this._totalPage = Math.ceil(this.total / this.options.pageSize);

    let pages: any[] = [1];

    if (this._totalPage > 1) {

      let start = this.pageIndex - this.options.size,
        end = this.pageIndex + this.options.size;

      start = start < 2 ? 2 : start;
      end = end > this.totalPage - 1 ? this.totalPage - 1 : end;

      start - 2 >= 1 && (pages.push(PAGINATION_ELLIPSIS));
      pages = pages.concat(Array(end - start + 1).fill(start).map((value, index) => value + index));

      end + 2 <= this.totalPage && (pages.push(PAGINATION_ELLIPSIS));

      this.totalPage > 1 && pages.push(this.totalPage);
    }

    this._pages = pages;
  }
}
