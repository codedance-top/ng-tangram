
import { Component, EventEmitter, Input, Inject, Output, Optional, ViewEncapsulation } from '@angular/core';
import { NtPaginationConfig, NT_PAGINATION_CONFIG } from './pagination-config';

@Component({
  selector: 'nt-pagination, [nt-pagination]',
  template: `
    <ul class="pagination">
      <li class="pagination-previous disabled" *ngIf="_pageIndex <= 1">{{ _config.previousLabel }}</li>
      <li class="pagination-previous" *ngIf="_pageIndex > 1"><a (click)="onPageChange(_pageIndex - 1)">{{ _config.previousLabel }}</a></li>

      <ng-container *ngFor="let page of _pages">
        <li *ngIf="page === _pageIndex" [class.current]="page === _pageIndex">{{ page }}</li>
        <li *ngIf="page !== _pageIndex && page !== '...'"><a (click)="onPageChange(page)">{{ page }}</a></li>
        <li class="ellipsis" *ngIf="page === '...'"></li>
      </ng-container>

      <li class="pagination-next disabled" *ngIf="_pageIndex >= _totalPage">{{ _config.nextLabel }}</li>
      <li class="pagination-next" *ngIf="_pageIndex < _totalPage"><a (click)="onPageChange(_pageIndex + 1)">{{ _config.nextLabel }}</a></li>
    </ul>

  `,
  styleUrls: ['pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'aria-label': '分页导航'
  }
})

export class NtPaginationComponent {

  _config = new NtPaginationConfig();

  _total = 0;
  _totalPage = 1;
  _pageIndex = 1;
  _pages = [1];

  @Output('ntOnPageChange') _onPageChange = new EventEmitter<number>();

  constructor(
    @Optional() @Inject(NT_PAGINATION_CONFIG) defaultConfig: NtPaginationConfig,
  ) {
    this._config = { ...this._config, ...defaultConfig || {} };
  }

  @Input('ntPageSize')
  set pageSize(value: number) {
    this._config.pageSize = value;
  }

  @Input('ntPreviousLabel')
  set previousLabel(value: string) {
    this._config.nextLabel = value;
  }

  @Input('ntNextLabel')
  set nextLabel(value: string) {
    this._config.nextLabel = value;
  }

  @Input('ntTotal')
  set total(value: number) {
    this._total = value;
    this._build();
  }

  @Input('ntPageIndex')
  set pageIndex(value: number) {
    this._pageIndex = value;
    this._build();
  }

  onPageChange(index: number) {
    // this.pageIndex = index;
    this._onPageChange.emit(index);
  }

  private _build() {
    this._totalPage = Math.ceil(this._total / this._config.pageSize);

    let pages: any = [1];
    let start = this._pageIndex - this._config.size,
          end = this._pageIndex + this._config.size;

    const ellipsis = '...';

    start = start < 2 ? 2 : start;
    end = end > this._totalPage - 1 ? this._totalPage - 1 : end;

    start - 2 >= 1 && (pages.push(ellipsis));
    pages = pages.concat(Array(end - start + 1).fill(start).map((value, index) => value + index));

    end + 2 <= this._totalPage && (pages.push(ellipsis));

    this._totalPage > 1 && pages.push(this._totalPage);
    this._pages = pages;
  }
}
