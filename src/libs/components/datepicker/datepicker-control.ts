import { Observable } from 'rxjs';

import { InjectionToken } from '@angular/core';

import { NtOverlayComponent } from '../overlay';
import { NtCalendarCellClassFunction } from './calendar-body.component';

/** Function that can be used to filter out dates from a calendar. */
export type DateFilterFn<D> = (date: D | null) => boolean;

/** Form control that can be associated with a datepicker. */
export interface NtDatePickerControl<D> {
  id?: string;
  startAt: D | null;
  min: D | null;
  max: D | null;
  dateClass: NtCalendarCellClassFunction<D>;
  dateFilter: DateFilterFn<D>;
  overlay: NtOverlayComponent;
  _stateChanges: Observable<void>;
}

export const NT_DATE_PICKER_CONTROL = new InjectionToken<NtDatePickerControl<unknown>>('nt-datepicker-control')
