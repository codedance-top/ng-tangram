import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, Portal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgControl, ValidatorFn } from '@angular/forms';
import {
  DateAdapter,
  fadeIn,
  fadeOut,
  NT_DATE_FORMATS,
  NtDateFormats
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { BOTTOM_LEFT, NtOverlayComponent, TOP_LEFT } from '@ng-tangram/components/overlay';

import { NtCalendarCellClassFunction } from './calendar-body.component';
import { NtDatePickerContent } from './datepicker-content.component';
import { DateFilterFn, NT_DATE_PICKER_CONTROL, NtDatePickerControl } from './datepicker-control';
import {
  DEFAULT_DATEPICKER_ICONS,
  NT_DATEPICKER_ICONS,
  NtDatePickerIcons
} from './datepicker-icons';
import { NtDatePickerInputBase } from './datepicker-input-base';
import { NT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, NtDateSelectionModel } from './selections';

let datepickerUid = 0;

// const _NtDatePickerInputBase: NtOverlayControlCtor &
//   typeof NtDatePickerInputBase = mixinOverlayControl(NtDatePickerInputBase);

@Component({
  selector: 'nt-datepicker',
  templateUrl: 'datepicker.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-datepicker',
    '(click)': '_onClick($event)',
  },
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.15)),
      transition('void => *', fadeIn(.15))
    ])
  ],
  providers: [
    { provide: NtFormFieldControl, useExisting: NtDatePicker },
    { provide: NT_DATE_PICKER_CONTROL, useExisting: NtDatePicker },
    NT_SINGLE_DATE_SELECTION_MODEL_PROVIDER
  ]
})
export class NtDatePicker<D> extends NtDatePickerInputBase<D | null, D>
  implements NtFormFieldControl<D>, NtDatePickerControl<D>, AfterViewInit, OnChanges, OnDestroy {

  private _overlayToggle = new Subject<boolean>();

  _displayValue = '';

  id: string = `nt-datepicker-${datepickerUid++}`;

  tabIndex: number;

  _portal: Portal<any>;

  _positionPairs: ConnectionPositionPair[] = [BOTTOM_LEFT, TOP_LEFT];

  private _startAt: D | null;

  @Input()
  get startAt(): D | null { return this._startAt || this._getStartValue(); }
  set startAt(value: D | null) { this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  private _min: D | null;

  @Input()
  get min(): D | null { return this._min; }
  set min(value: D | null) { this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  private _max: D | null;

  @Input()
  get max(): D | null { return this._max; }
  set max(value: D | null) { this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  private _placeholder = '';

  @Input()
  set placeholder(value: string) { this._placeholder = value; }
  get placeholder() { return this._placeholder; }

  private _readonly = false;

  @Input()
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  get readonly() { return this._readonly; }

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

  _validator: ValidatorFn;

  readonly origin: CdkOverlayOrigin;

  readonly _stateChanges = new Subject<void>();

  constructor(
    public _elementRef: ElementRef,
    @Attribute('tabindex') tabIndex: string,
    @Optional() @Inject(NT_DATEPICKER_ICONS) public  icons: NtDatePickerIcons,
    @Inject(NT_DATE_FORMATS) private  _dateFormats: NtDateFormats,
    private _changeDetectorRef: ChangeDetectorRef,
    dateAdapter: DateAdapter<D>,
    _model: NtDateSelectionModel<D, D>,
    @Optional() @Self() public ngControl: NgControl) {

    super(dateAdapter);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this._registerModel(_model);

    this.origin = new CdkOverlayOrigin(_elementRef);

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
  focused?: boolean;
  empty?: boolean;


  getErrors() {
    return this.ngControl?.errors;
  }

  _isActivated(): boolean {
    return !this.disabled;
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
    if (!this.disabled) {
      this.overlay.toggle();
    }
    event.stopPropagation();
  }

  _onClear(event: Event) {
    if (!this.disabled) {
      this._model.updateSelection(this._getDefaultModelValue(), this);
    }
    event.stopPropagation();
  }

  _assignValueToModel(value: D | null): void {
    if (this._model) {
      value = this._dateAdapter.deserialize(value);
      this._model.updateSelection(value, this);
      this._valueChange(value);
    }
  }

  _getValueFromModel(modelValue: D): D {
    return modelValue;
  }

  _getMinDate(): D | null {
    return this.min;
  }

  _getMaxDate(): D | null {
    return this.max;
  }

  _getDateFilter(): DateFilterFn<D> {
    return this.dateFilter;
  }

  _getStartValue() { return this._model?.selection; }

  protected _formatValue(modelValue: D | null) {
    if(modelValue) {
      this._displayValue = this._dateAdapter.format(modelValue, this._dateFormats.display.dateInput);
    } else {
      this._displayValue = '';
    }
  }

  protected _getDefaultModelValue(): D | null {
    return null;
  }
}
