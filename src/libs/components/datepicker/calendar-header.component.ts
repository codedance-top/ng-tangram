import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NtDateFormats } from '@ng-tangram/components/core';

import { isSameMultiYearView, yearsPerPage } from './calendar-utils';
import { NtDatePickerCalendar, NtDatePickerViewType } from './calendar.component';

@Component({
  selector: 'nt-calendar-header',
  templateUrl: 'calendar-header.component.html',
  exportAs: 'ntCalendarHeader',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-calendar-header'
  }
})
export class NtCalendarHeader<D> {
  constructor(
    @Inject(forwardRef(() => NtDatePickerCalendar)) public calendar: NtDatePickerCalendar<D>,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats,
    changeDetectorRef: ChangeDetectorRef) {

    this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
  }

  get _monthLabel() {
    return this._dateAdapter.format(this.calendar.activeDate, this._dateFormats.display.monthLabel).toLocaleUpperCase();
  }

  get _yearLabel() {
    return this._dateAdapter.getYearName(this.calendar.activeDate);
  }

  get _multiYearLabel() {
    const activeYear = this._dateAdapter.getYear(this.calendar.activeDate);
    const firstYearInView = this._dateAdapter.getYearName(
      this._dateAdapter.createDate(activeYear - activeYear % yearsPerPage, 0, 1), 'en-US');
    const lastYearInView = this._dateAdapter.getYearName(
      this._dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % yearsPerPage, 0, 1), 'en-US');
    return `${firstYearInView} \u2013 ${lastYearInView}`;
  }

  /** Handles user clicks on the period label. */
  currentPeriodClicked(): void {
    this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
  }

  prevMonth() {
    this.calendar.activeDate = this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
  }

  nextMonth() {
    this.calendar.activeDate = this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
  }

  prevYear() {
    this.calendar.activeDate = this._dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
  }

  nextYear() {
    this.calendar.activeDate = this._dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }

  prevYearArray() {
    this.calendar.activeDate = this._dateAdapter.addCalendarYears(this.calendar.activeDate, -yearsPerPage);
  }

  nextYearArray() {
    this.calendar.activeDate = this._dateAdapter.addCalendarYears(this.calendar.activeDate, yearsPerPage);
  }


  /** Whether the previous period button is enabled. */
  previousEnabled(viewType: NtDatePickerViewType = 'month'): boolean {
    if (!this.calendar.minDate) {
      return true;
    }
    return !this.calendar.minDate ||
        !this._isSameView(this.calendar.activeDate, this.calendar.minDate, viewType);
  }

  /** Whether the next period button is enabled. */
  nextEnabled(viewType: NtDatePickerViewType = 'month'): boolean {
    return !this.calendar.maxDate ||
        !this._isSameView(this.calendar.activeDate, this.calendar.maxDate, viewType);
  }

  changeCurrentView(viewType: NtDatePickerViewType) {
    this.calendar.currentView = viewType;
  }

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: D, date2: D, viewType: NtDatePickerViewType = 'month'): boolean {
    if (viewType == 'month') {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
          this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2);
    }
    if (viewType == 'year') {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
    }

    // Otherwise we are in 'multi-year' view.
    return isSameMultiYearView(
      this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
  }
}

