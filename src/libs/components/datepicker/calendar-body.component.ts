import { take } from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { isEnd, isInRange, isStart, isTableCell } from './calendar-utils';

export type NtCalendarCellCssClasses = string | string[] | Set<string> | {[key: string]: any};

export type NtCalendarCellClassFunction<D> =
    (date: D, view: 'month' | 'year' | 'multi-year') => NtCalendarCellCssClasses;

export class NtCalendarCell<D = any> {
  constructor(
    public value: number,
    public displayValue: string,
    public enabled: boolean,
    public cssClasses: NtCalendarCellCssClasses = {},
    public compareValue = value,
    public rawValue?: D) {}
}

export interface NtCalendarUserEvent<D> {
  value: D;
  event: Event;
}

@Component({
  selector: '[nt-calendar-body]',
  templateUrl: 'calendar-body.component.html',
  host: {
    'class': 'nt-calendar-body'
  },
  exportAs: 'ntCalendarBody',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NtCalendarBody implements OnChanges, OnDestroy {

  private _skipNextFocus: boolean;

  @Input() label: string;

  @Input() rows: NtCalendarCell[][];

  @Input() todayValue: number;

  @Input() startValue: number;

  @Input() endValue: number;

  @Input() numCols: number = 7;

  @Input() activeCell: number = 0;

  @Input() isRange: boolean = false;

  @Input() cellAspectRatio: number = 1;

  @Input() comparisonStart: number | null;

  @Input() comparisonEnd: number | null;

  @Input() previewStart: number | null = null;

  @Input() previewEnd: number | null = null;

  @Output() readonly selectedValueChange: EventEmitter<NtCalendarUserEvent<number>> =
      new EventEmitter<NtCalendarUserEvent<number>>();

  @Output() previewChange = new EventEmitter<NtCalendarUserEvent<NtCalendarCell | null>>();

  _firstRowOffset: number;

  _cellPadding: string;

  _cellWidth: string;

  constructor(private _elementRef: ElementRef<HTMLElement>, private _ngZone: NgZone) {
    _ngZone.runOutsideAngular(() => {
      const element = _elementRef.nativeElement;
      element.addEventListener('mouseenter', this._enterHandler, true);
      element.addEventListener('focus', this._enterHandler, true);
      element.addEventListener('mouseleave', this._leaveHandler, true);
      element.addEventListener('blur', this._leaveHandler, true);
    });
  }

  _cellClicked(cell: NtCalendarCell, event: MouseEvent): void {
    if (cell.enabled) {
      this.selectedValueChange.emit({value: cell.value, event});
    }
  }

  _isSelected(value: number) {
    return this.startValue === value || this.endValue === value;
  }

  ngOnChanges(changes: SimpleChanges) {
    const columnChanges = changes['numCols'];
    const {rows, numCols} = this;

    if (changes['rows'] || columnChanges) {
      this._firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
    }

    if (changes['cellAspectRatio'] || columnChanges || !this._cellPadding) {
      this._cellPadding = `${50 * this.cellAspectRatio / numCols}%`;
    }

    if (columnChanges || !this._cellWidth) {
      this._cellWidth = `${100 / numCols}%`;
    }
  }

  ngOnDestroy() {
    const element = this._elementRef.nativeElement;
    element.removeEventListener('mouseenter', this._enterHandler, true);
    element.removeEventListener('focus', this._enterHandler, true);
    element.removeEventListener('mouseleave', this._leaveHandler, true);
    element.removeEventListener('blur', this._leaveHandler, true);
  }

  _isActiveCell(rowIndex: number, colIndex: number): boolean {
    let cellNumber = rowIndex * this.numCols + colIndex;

    // Account for the fact that the first row may not have as many cells.
    if (rowIndex) {
      cellNumber -= this._firstRowOffset;
    }

    return cellNumber == this.activeCell;
  }

  _focusActiveCell(movePreview = true) {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        const activeCell: HTMLElement | null =
            this._elementRef.nativeElement.querySelector('.nt-calendar-body-active');

        if (activeCell) {
          if (!movePreview) {
            this._skipNextFocus = true;
          }

          activeCell.focus();
        }
      });
    });
  }

  _isRangeStart(value: number) {
    return isStart(value, this.startValue, this.endValue);
  }

  _isRangeEnd(value: number) {
    return isEnd(value, this.startValue, this.endValue);
  }

  _isInRange(value: number): boolean {
    return isInRange(value, this.startValue, this.endValue, this.isRange);
  }

  _isComparisonStart(value: number) {
    return isStart(value, this.comparisonStart, this.comparisonEnd);
  }

  _isComparisonBridgeStart(value: number, rowIndex: number, colIndex: number) {
    if (!this._isComparisonStart(value) || this._isRangeStart(value) || !this._isInRange(value)) {
      return false;
    }

    let previousCell: NtCalendarCell | undefined = this.rows[rowIndex][colIndex - 1];

    if (!previousCell) {
      const previousRow = this.rows[rowIndex - 1];
      previousCell = previousRow && previousRow[previousRow.length - 1];
    }

    return previousCell && !this._isRangeEnd(previousCell.compareValue);
  }

  _isComparisonBridgeEnd(value: number, rowIndex: number, colIndex: number) {
    if (!this._isComparisonEnd(value) || this._isRangeEnd(value) || !this._isInRange(value)) {
      return false;
    }

    let nextCell: NtCalendarCell | undefined = this.rows[rowIndex][colIndex + 1];

    if (!nextCell) {
      const nextRow = this.rows[rowIndex + 1];
      nextCell = nextRow && nextRow[0];
    }

    return nextCell && !this._isRangeStart(nextCell.compareValue);
  }

  _isComparisonEnd(value: number) {
    return isEnd(value, this.comparisonStart, this.comparisonEnd);
  }

  _isInComparisonRange(value: number) {
    return isInRange(value, this.comparisonStart, this.comparisonEnd, this.isRange);
  }

  /**
   * Gets whether a value is the same as the start and end of the comparison range.
   * For context, the functions that we use to determine whether something is the start/end of
   * a range don't allow for the start and end to be on the same day, because we'd have to use
   * much more specific CSS selectors to style them correctly in all scenarios. This is fine for
   * the regular range, because when it happens, the selected styles take over and still show where
   * the range would've been, however we don't have these selected styles for a comparison range.
   * This function is used to apply a class that serves the same purpose as the one for selected
   * dates, but it only applies in the context of a comparison range.
   */
  _isComparisonIdentical(value: number) {
    // Note that we don't need to null check the start/end
    // here, because the `value` will always be defined.
    return this.comparisonStart === this.comparisonEnd && value === this.comparisonStart;
  }

  _isPreviewStart(value: number) {
    return isStart(value, this.previewStart, this.previewEnd);
  }

  _isPreviewEnd(value: number) {
    return isEnd(value, this.previewStart, this.previewEnd);
  }

  _isInPreview(value: number) {
    return isInRange(value, this.previewStart, this.previewEnd, this.isRange);
  }

  /**
   * Event handler for when the user enters an element
   * inside the calendar body (e.g. by hovering in or focus).
   */
  private _enterHandler = (event: Event) => {
    if (this._skipNextFocus && event.type === 'focus') {
      this._skipNextFocus = false;
      return;
    }
    // We only need to hit the zone when we're selecting a range.
    if (event.target && this.isRange) {
      const cell = this._getCellFromElement(event.target as HTMLElement);

      if (cell) {
        this._ngZone.run(() => this.previewChange.emit({value: cell.enabled ? cell : null, event}));
      }
    }
  }

  /**
   * Event handler for when the user's pointer leaves an element
   * inside the calendar body (e.g. by hovering out or blurring).
   */
  private _leaveHandler = (event: Event) => {
    // We only need to hit the zone when we're selecting a range.
    if (this.previewEnd !== null && this.isRange) {
      // Only reset the preview end value when leaving cells. This looks better, because
      // we have a gap between the cells and the rows and we don't want to remove the
      // range just for it to show up again when the user moves a few pixels to the side.
      if (event.target && isTableCell(event.target as HTMLElement)) {
        this._ngZone.run(() => this.previewChange.emit({value: null, event}));
      }
    }
  }

  private _getCellFromElement(element: HTMLElement): NtCalendarCell | null {
    let cell: HTMLElement | undefined;

    if (isTableCell(element)) {
      cell = element;
    } else if (isTableCell(element.parentNode!)) {
      cell = element.parentNode as HTMLElement;
    }

    if (cell) {
      const row = cell.getAttribute('data-nt-row');
      const col = cell.getAttribute('data-nt-col');

      if (row && col) {
        return this.rows[parseInt(row)][parseInt(col)];
      }
    }

    return null;
  }

}
