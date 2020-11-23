import { Observable, Subject } from 'rxjs';

import {
  Directive,
  FactoryProvider,
  Injectable,
  OnDestroy,
  Optional,
  SkipSelf
} from '@angular/core';
import { DateAdapter } from '@ng-tangram/components/core';

/** A class representing a range of dates. */
export class DateRange<D> {
  /**
   * Ensures that objects with a `start` and `end` property can't be assigned to a variable that
   * expects a `DateRange`
   */
  // tslint:disable-next-line:no-unused-variable
  private _disableStructuralEquivalency: never;

  constructor(
    readonly start: D | null,
    readonly end: D | null
  ) { }
}

export type ExtractDateTypeFromSelection<T> = T extends DateRange<infer D> ? D : NonNullable<T>;

export interface DateSelectionModelChange<S> {

  selection: S;

  source: unknown;
}

/** A selection model containing a date selection. */
@Directive()
export abstract class NtDateSelectionModel<S, D = ExtractDateTypeFromSelection<S>>
    implements OnDestroy {
  private _selectionChanged = new Subject<DateSelectionModelChange<S>>();

  /** Emits when the selection has changed. */
  selectionChanged: Observable<DateSelectionModelChange<S>> = this._selectionChanged;

  protected constructor(
    /** The current selection. */
    readonly selection: S,
    protected _adapter: DateAdapter<D>) {
    this.selection = selection;
  }

  /**
   * Updates the current selection in the model.
   * @param value New selection that should be assigned.
   * @param source Object that triggered the selection change.
   */
  updateSelection(value: S, source: unknown) {
    (this as {selection: S}).selection = value;
    this._selectionChanged.next({selection: value, source});
  }

  ngOnDestroy() {
    this._selectionChanged.complete();
  }

  protected _isValidDateInstance(date: D): boolean {
    return this._adapter.isDateInstance(date) && this._adapter.isValid(date);
  }

  /** Adds a date to the current selection. */
  abstract add(date: D | null): void;

  /** Checks whether the current selection is valid. */
  abstract isValid(): boolean;

  /** Checks whether the current selection is complete. */
  abstract isComplete(): boolean;
}

/**  A selection model that contains a single date. */
@Injectable()
export class NtSingleDateSelectionModel<D> extends NtDateSelectionModel<D | null, D> {
  constructor(adapter: DateAdapter<D>) {
    super(null, adapter);
  }

  /**
   * Adds a date to the current selection. In the case of a single date selection, the added date
   * simply overwrites the previous selection
   */
  add(date: D | null) {
    super.updateSelection(date, this);
  }

  /** Checks whether the current selection is valid. */
  isValid(): boolean {
    return this.selection != null && this._isValidDateInstance(this.selection);
  }

  /**
   * Checks whether the current selection is complete. In the case of a single date selection, this
   * is true if the current selection is not null.
   */
  isComplete() {
    return this.selection != null;
  }
}

/**  A selection model that contains a date range. */
@Injectable()
export class NtRangeDateSelectionModel<D> extends NtDateSelectionModel<DateRange<D>, D> {
  constructor(adapter: DateAdapter<D>) {
    super(new DateRange<D>(null, null), adapter);
  }

  /**
   * Adds a date to the current selection. In the case of a date range selection, the added date
   * fills in the next `null` value in the range. If both the start and the end already have a date,
   * the selection is reset so that the given date is the new `start` and the `end` is null.
   */
  add(date: D | null): void {
    let {start, end} = this.selection;

    if (start == null) {
      start = date;
    } else if (end == null) {
      end = date;
    } else {
      start = date;
      end = null;
    }

    super.updateSelection(new DateRange<D>(start, end), this);
  }

  /** Checks whether the current selection is valid. */
  isValid(): boolean {
    const {start, end} = this.selection;

    // Empty ranges are valid.
    if (start == null && end == null) {
      return true;
    }

    // Complete ranges are only valid if both dates are valid and the start is before the end.
    if (start != null && end != null) {
      return this._isValidDateInstance(start) && this._isValidDateInstance(end) &&
             this._adapter.compareDate(start, end) <= 0;
    }

    // Partial ranges are valid if the start/end is valid.
    return (start == null || this._isValidDateInstance(start)) &&
           (end == null || this._isValidDateInstance(end));
  }

  /**
   * Checks whether the current selection is complete. In the case of a date range selection, this
   * is true if the current selection has a non-null `start` and `end`.
   */
  isComplete(): boolean {
    return this.selection.start != null && this.selection.end != null;
  }
}

/** @docs-private */
export function NT_SINGLE_DATE_SELECTION_MODEL_FACTORY(
    parent: NtSingleDateSelectionModel<unknown>, adapter: DateAdapter<unknown>) {
  return parent || new NtSingleDateSelectionModel(adapter);
}

/** Used to provide a single selection model to a component. */
export const NT_SINGLE_DATE_SELECTION_MODEL_PROVIDER: FactoryProvider = {
  provide: NtDateSelectionModel,
  deps: [[new Optional(), new SkipSelf(), NtDateSelectionModel], DateAdapter],
  useFactory: NT_SINGLE_DATE_SELECTION_MODEL_FACTORY,
};


/** @docs-private */
export function NT_RANGE_DATE_SELECTION_MODEL_FACTORY(
    parent: NtSingleDateSelectionModel<unknown>, adapter: DateAdapter<unknown>) {
  return parent || new NtRangeDateSelectionModel(adapter);
}

/** Used to provide a range selection model to a component. */
export const NT_RANGE_DATE_SELECTION_MODEL_PROVIDER: FactoryProvider = {
  provide: NtDateSelectionModel,
  deps: [[new Optional(), new SkipSelf(), NtDateSelectionModel], DateAdapter],
  useFactory: NT_RANGE_DATE_SELECTION_MODEL_FACTORY,
};
