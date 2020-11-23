/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, Portal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Attribute,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NtDateFormats } from '@ng-tangram/components/core';
import { BOTTOM_LEFT, NtOverlayComponent, TOP_LEFT } from '@ng-tangram/components/overlay';

import { NtCalendarCellClassFunction } from './calendar-body.component';
import { NtDatePickerContent } from './datepicker-content.component';
import { NtDatePickerControl } from './datepicker-control';
import {
  DEFAULT_DATEPICKER_ICONS,
  NT_DATEPICKER_ICONS,
  NtDatePickerIcons
} from './datepicker-icons';
import {
  ExtractDateTypeFromSelection,
  NtDateSelectionModel
} from './selections/date-selection-model';

/** Base class for a datepicker. */
@Directive()
export abstract class NtDatePickerBase<S, D = ExtractDateTypeFromSelection<S>>
  implements NtDatePickerControl<D>, AfterViewInit, OnChanges, OnDestroy {

  private _overlayToggle = new Subject<boolean>();

  tabIndex: number;

  _portal: Portal<any>;

  _positionPairs: ConnectionPositionPair[] = [BOTTOM_LEFT, TOP_LEFT];

  private _startAt: D | null;

  @Input()
  get startAt(): D | null { return this._startAt || this._getStartValue(); }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  private _min: D | null;

  @Input()
  get min(): D | null { return this._min; }
  set min(value: D | null) {
    this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  private _max: D | null;

  @Input()
  get max(): D | null { return this._max; }
  set max(value: D | null) {
    this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: NtCalendarCellClassFunction<D>;

  @Input() dateFilter: (date: D) => boolean;

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent, { static: true }) overlay: NtOverlayComponent;

  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet: CdkPortalOutlet;

  protected abstract _isActivated(): boolean;
  protected abstract _getStartValue(): D | null;
  protected abstract _getDefaultModelValue(): S | null;
  protected abstract _formatValue(modelValue: S): void;

  readonly origin: CdkOverlayOrigin;

  readonly _stateChanges = new Subject<void>();

  constructor(
    elementRef: ElementRef,
    @Attribute('tabindex') tabIndex: string,
    @Optional() @Inject(NT_DATEPICKER_ICONS) public icons: NtDatePickerIcons,
    @Inject(NT_DATE_FORMATS) protected _dateFormats: NtDateFormats,
    protected _changeDetectorRef: ChangeDetectorRef,
    protected _dateAdapter: DateAdapter<D>,
    protected _model: NtDateSelectionModel<S, D>) {

    this.origin = new CdkOverlayOrigin(elementRef);

    this.icons = { ...DEFAULT_DATEPICKER_ICONS, ...icons };

    this.tabIndex = parseInt(tabIndex) || 0;

    this._overlayToggle.pipe(debounceTime(10)).subscribe(open => open
      ? this.overlay.open()
      : this.overlay.toggle()
    );

    this._model.selectionChanged.subscribe(value => {
      this._formatValue(value.selection);
    });
  }

  ngAfterViewInit() {
    this._changeDetectorRef.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.value || changes.startAt || changes.minDate || changes.maxDate;
    if(change && !change.firstChange) {
      this._changeDetectorRef.markForCheck();
    }
    this._stateChanges.next(undefined);
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }

  focus() {
    this.overlay.open();
  }

  select(date: D): void {
    this._model.add(date);
  }

  _onAfterOpen(event: any) {
    this.afterOpen.next(event);
  }

  _onAfterClosed(event: any) {
    this.afterClosed.next(event);
    this._portal.detach();
  }

  _onBeforeOpen(event: any) {
    this._portal = new ComponentPortal(NtDatePickerContent);
    this.beforeOpen.next(event);
  }

  _onBeforeClosed(event: any) {
    this.beforeClosed.next(event);
  }

  _onPositionChange(change: ConnectedOverlayPositionChange) {
    this.positionChange.next(change);
  }

  _onClick(event: Event) {
    if (this._isActivated()) {
      this.overlay.toggle();
    }
    event.stopPropagation();
  }

  _onClear(event: Event) {
    if (this._isActivated()) {
      this._model.updateSelection(this._getDefaultModelValue(), this);
    }
    event.stopPropagation();
  }
}
