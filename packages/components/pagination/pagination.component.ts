import {
  Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation
} from '@angular/core';
import { NT_PAGINATION_CONFIG, NtPaginationConfig } from './pagination-config';

@Component({
  selector: 'nt-pagination, [nt-pagination]',
  templateUrl: 'pagination.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'aria-label': '分页导航'
  }
})
export class NtPaginationComponent {

  private _config = new NtPaginationConfig();

  private _total = 0;
  private _totalPage = 1;
  private _pageIndex = 1;
  private _pages = [1];

  get config() { return this._config; }
  get totalPage() { return this._totalPage; }
  get pages() { return this._pages; }

  @Input()
  set pageSize(value: number) { this._config.pageSize = value; }
  get pageSize() { return this.config.pageSize; }

  @Input()
  set previousLabel(value: string) { this._config.previousLabel = value; }
  get previousLabel() { return this.config.previousLabel; }

  @Input()
  set nextLabel(value: string) { this._config.nextLabel = value; }
  get nextLabel() { return this.config.nextLabel; }

  @Input()
  set total(value: number) { this._total = value; this._build(); }
  get total() { return this._total; }

  @Input()
  set pageIndex(value: number) { this._pageIndex = value; this._build(); }
  get pageIndex() { return this._pageIndex; }

  @Output() pageChange = new EventEmitter<number>();

  constructor(
    @Optional() @Inject(NT_PAGINATION_CONFIG) defaultConfig?: NtPaginationConfig,
  ) {
    this._config = { ...this._config, ...defaultConfig || {} };
  }

  _pageChange(index: number) {
    this._pageIndex = index;
    this.pageChange.emit(index);
  }

  private _build() {
    this._totalPage = Math.ceil(this.total / this.config.pageSize);

    let pages: any = [1];
    let start = this.pageIndex - this.config.size,
          end = this.pageIndex + this.config.size;

    const ellipsis = '...';

    start = start < 2 ? 2 : start;
    end = end > this.totalPage - 1 ? this.totalPage - 1 : end;

    start - 2 >= 1 && (pages.push(ellipsis));
    pages = pages.concat(Array(end - start + 1).fill(start).map((value, index) => value + index));

    end + 2 <= this.totalPage && (pages.push(ellipsis));

    this.totalPage > 1 && pages.push(this.totalPage);
    this._pages = pages;
  }
}
