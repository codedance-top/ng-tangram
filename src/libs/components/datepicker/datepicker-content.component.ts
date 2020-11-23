/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Subscription } from 'rxjs';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter } from '@ng-tangram/components/core';

import { NtCalendarUserEvent } from './calendar-body.component';
import { NtDatePickerCalendar } from './calendar.component';
import { NT_DATE_PICKER_CONTROL, NtDatePickerControl } from './datepicker-control';
import {
  DateRange,
  ExtractDateTypeFromSelection,
  NT_DATE_RANGE_SELECTION_STRATEGY,
  NtDateRangeSelectionStrategy,
  NtDateSelectionModel
} from './selections';

@Component({
  selector: 'nt-datepicker-content',
  templateUrl: 'datepicker-content.component.html',
  host: {
    'class': 'nt-datepicker-content',
  },
  exportAs: 'ntDatepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NtDatePickerContent<S, D = ExtractDateTypeFromSelection<S>> implements AfterViewInit, OnDestroy {

  private _subscriptions = new Subscription();

  /** Reference to the internal calendar component. */
  @ViewChild(NtDatePickerCalendar) _calendar: NtDatePickerCalendar<D>;

  /** Start of the comparison range. */
  comparisonStart: D | null;

  /** End of the comparison range. */
  comparisonEnd: D | null;

  constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _model: NtDateSelectionModel<S, D>,
    private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(NT_DATE_RANGE_SELECTION_STRATEGY)
    private _rangeSelectionStrategy: NtDateRangeSelectionStrategy<D>,
    @Inject(NT_DATE_PICKER_CONTROL) public datepicker: NtDatePickerControl<D>
    ) { }

  ngAfterViewInit() {
    this._subscriptions.add(this.datepicker._stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    }));

    this._calendar.focusActiveCell();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  _handleUserSelection(event: NtCalendarUserEvent<D | null>) {
    const selection = this._model.selection;
    const value = event.value;
    const isRange = selection instanceof DateRange;

    // If we're selecting a range and we have a selection strategy, always pass the value through
    // there. Otherwise don't assign null values to the model, unless we're selecting a range.
    // A null value when picking a range means that the user cancelled the selection (e.g. by
    // pressing escape), whereas when selecting a single value it means that the value didn't
    // change. This isn't very intuitive, but it's here for backwards-compatibility.
    if (isRange && this._rangeSelectionStrategy) {
      const newSelection = this._rangeSelectionStrategy.selectionFinished(value,
          selection as unknown as DateRange<D>, event.event);
      this._model.updateSelection(newSelection as unknown as S, this);
    } else if (value && (isRange ||
              !this._dateAdapter.sameDate(value, selection as unknown as D))) {
      this._model.add(value);
    }

    if (!this._model || this._model.isComplete()) {
      this.datepicker.overlay.close();
    }
  }

  _getSelected() {
    return this._model.selection as unknown as D | DateRange<D> | null;
  }
}
