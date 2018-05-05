import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren,
  ElementRef, EventEmitter, forwardRef, Inject, InjectionToken, Input, isDevMode, NgZone, OnChanges,
  OnDestroy, Optional, Output, QueryList, Renderer2, Self, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import {
  NT_OPTION_PARENT_COMPONENT, NtOptionComponent, NtOptionParentComponent, NtOptionSelectionChange,
  NtOverlayComponent, NtOverlayPosition
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { filter, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export function getNtSelectDynamicMultipleError() {
  return Error('Cannot change `multiple` mode of select after initialization.');
}

export function getNtSelectNonArrayValueError() {
  return Error('Value must be an array in multiple-selection mode.');
}

export function getNtSelectNonFunctionValueError() {
  return Error('`ntCompareWith` must be a function.');
}

export class NtSelectChange {
  constructor(public source: NtSelectComponent, public value: any) { }
}

@Component({
  selector: 'nt-select',
  templateUrl: 'select.component.html',
  providers: [
    { provide: NT_OPTION_PARENT_COMPONENT, useExisting: NtSelectComponent },
    { provide: NtFormFieldControl, useExisting: NtSelectComponent }
  ],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.15)),
      transition('void => *', fadeIn(.15))
    ])
  ],
  host: {
    'class': 'nt-select nt-form-control nt-has-symbol',
    '(resize)': 'onResize()',
    '[class.focus]': 'overlay.isOpen'
  }
})
export class NtSelectComponent extends NtFormFieldControl<any>
  implements AfterContentInit, ControlValueAccessor, NtOptionParentComponent, OnDestroy {

  private readonly _destroy = new Subject<void>();

  readonly origin: CdkOverlayOrigin;

  private _disabled = false;
  private _focused = false;
  private _selectionModel: SelectionModel<NtOptionComponent>;
  private _state = '';
  private _placeholder = '';
  private _width: number;
  private _multiple = false;
  private _value: any;
  private _viewValue: any;
  private _required = false;

  private _compareWith = (o1: any, o2: any) => o1 === o2;
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };
  private _filter: (keyword: string, option: NtOptionComponent) => boolean;

  _filterEmpty = false;

  get value() { return this._value; }
  get triggerValue(): string {
    if (this.empty) {
      return '';
    }

    if (this._multiple) {
      const selectedOptions = this._selectionModel.selected.map(option => option.label);
      return selectedOptions.join(', ');
    }

    return this._selectionModel.selected[0].label;
  }

  get empty(): boolean { return !this._selectionModel || this._selectionModel.isEmpty(); }

  get focused(): boolean { return this._focused; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  get state() { return this._state; }

  get width() { return this._width; }

  @Input()
  set multiple(value: boolean) { this._multiple = coerceBooleanProperty(value); }
  get multiple() { return this._multiple; }

  @Input()
  set filter(value: (input: string, option: NtOptionComponent) => boolean) {
    if (typeof value === 'function') {
      this._filter = value;
    } else if (coerceBooleanProperty(value)) {
      this._filter = (keyword: string, option: NtOptionComponent) => {
        const regex = new RegExp(keyword.toLowerCase(), 'g');
        return regex.test(option.label.toLowerCase());
      };
    }
  }
  get filter() { return this._filter; }

  @Input() filterNotFound = 'Not Found';

  get selected(): NtOptionComponent | NtOptionComponent[] {
    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  @Input()
  set placeholder(value: string) { this._placeholder = value; }
  get placeholder() {
    if (this.empty) {
      return this._placeholder;
    }

    return this.filter ? this.triggerValue : this._placeholder;
  }

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('paneElement') paneElement: ElementRef;

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;
  @ContentChildren(NtOptionComponent) options: QueryList<NtOptionComponent>;

  @Output() readonly selectionChange: EventEmitter<NtSelectChange> = new EventEmitter<NtSelectChange>();

  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw getNtSelectNonFunctionValueError();
    } else {
      this._compareWith = fn;
      if (this._selectionModel) {
        this._initializeSelection();
      }
    }
  }

  readonly optionSelectionChanges: Observable<NtOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public ngControl: NgControl) {
    super();

    this.origin = new CdkOverlayOrigin(_elementRef);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple, undefined, false);
  }

  ngAfterContentInit() {
    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });
  }

  onResize() {
    this._width = this.inputElement.nativeElement.clientWidth;
  }

  onSearch(event: Event) {
    if (this.focused && this.filter && !this.disabled) {
      const target: any = event.target;
      this.options.forEach(option => option._hidden = !this.filter(target.value, option));
      this._filterEmpty = !this.options.some(option => !option._hidden);
    }
  }

  onBeforeOpen() {
    this._state = 'folded';
    this.onResize();
    this._scrollActiveOptionIntoView();
  }

  onBeforeClosed() {
    this._state = 'closed';
    this._onTouched();
  }

  onAfterClosed() {
    this._resetFilterResult();
  }

  onFocus() {
    if (!this.overlay.isOpen && !this._disabled) {
      this.overlay.show();
      this._focused = true;
    }
  }

  onBlur() {
    this._focused = false;
  }

  focus() {
    this.inputElement.nativeElement.focus();
  }

  writeValue(value: any) {
    if (this.options) {
      this._setSelectionByValue(value);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  clear() {
    if (!this.disabled) {
      this._clearSelection();
      this._value = null;
      this._onChange(this.value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  private _resetOptions() {

    const changedOrDestroyed = merge(this.options.changes, this._destroy);

    this.optionSelectionChanges
      .pipe(takeUntil(changedOrDestroyed), filter(event => event.isUserInput))
      .subscribe(event => {
        this._onSelect(event.source);
        if (!this.multiple && this.overlay.isOpen) {
          this.overlay.hide();
        }
      });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map(option => option.stateChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });

    this._resetFilterResult();
  }

  private _resetFilterResult() {
    this.options.forEach(option => option._hidden = false);
    this._filterEmpty = false;
  }

  private _initializeSelection(): void {
    Promise.resolve().then(() => {
      this._setSelectionByValue(this.ngControl ? this.ngControl.value : this.value);
      this._scrollActiveOptionIntoView();
    });
  }

  private _setSelectionByValue(value: any | any[], isUserInput = false): void {

    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw getNtSelectNonArrayValueError();
      }

      this._clearSelection();
      value.forEach((currentValue: any) => this._selectValue(currentValue, isUserInput));
      this._sortValues();
    } else {
      this._clearSelection();
      const correspondingOption = this._selectValue(value, isUserInput);
    }

    this._changeDetectorRef.markForCheck();
  }

  private _selectValue(value: any, isUserInput = false): NtOptionComponent | undefined {
    const correspondingOption = this.options.find((option: NtOptionComponent) => {
      try {
        return option.value != null && this._compareWith(option.value, value);
      } catch (error) {
        if (isDevMode()) {
          console.warn(error);
        }
        return false;
      }
    });

    if (correspondingOption) {
      isUserInput ? correspondingOption.selectViaInteraction() : correspondingOption.select();
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.multiple) {
      valueToEmit = (this.selected as NtOptionComponent[]).map(option => option.value);
    } else {
      valueToEmit = this.selected ? (this.selected as NtOptionComponent).value : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new NtSelectChange(this, valueToEmit));
    this._changeDetectorRef.markForCheck();
  }

  private _clearSelection(skip?: NtOptionComponent) {
    this._selectionModel.clear();
    this.options.forEach(option => {
      if (option !== skip) {
        option.deselect();
      }
    });
  }

  private _sortValues(): void {
    if (this.multiple) {
      this._selectionModel.clear();

      this.options.forEach(option => {
        if (option.selected) {
          this._selectionModel.select(option);
        }
      });
    }
  }

  private _onSelect(option: NtOptionComponent) {
    const wasSelected = this._selectionModel.isSelected(option);

    if (this.multiple) {
      this._selectionModel.toggle(option);
      wasSelected ? option.deselect() : option.select();
      this._sortValues();
    } else {
      this._clearSelection(option.value == null ? undefined : option);

      if (option.value == null) {
        this._propagateChanges(option.value);
      } else {
        this._selectionModel.select(option);
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
  }

  private _scrollActiveOptionIntoView() {
    let selected: NtOptionComponent | null = null;

    if (this.selected instanceof NtOptionComponent) {
      selected = this.selected;
    } else if (this.selected instanceof Array && this.selected.length > 0) {
      selected = this.selected[0];
    }
    if (selected) {
      this.paneElement.nativeElement.scrollTop = selected.getOffsetY();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
