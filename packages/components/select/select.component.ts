
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input,
  Inject, InjectionToken, isDevMode, Renderer2, QueryList, ViewChild, ViewEncapsulation, NgZone, Output, Optional
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';

import {
  NtOverlayPosition, NtOverlayComponent, NtOptionComponent,
  NtOptionParentComponent, NtOptionSelectionChange, NT_OPTION_PARENT_COMPONENT
} from '@ng-tangram/components/_core';
import { animate, group, state, style, trigger, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { defer } from 'rxjs/observable/defer';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

export function getNtSelectDynamicMultipleError(): Error {
  return Error('Cannot change `multiple` mode of select after initialization.');
}

export function getNtSelectNonArrayValueError(): Error {
  return Error('Value must be an array in multiple-selection mode.');
}

export function getNtSelectNonFunctionValueError(): Error {
  return Error('`compareWith` must be a function.');
}

export class NtSelectChange {
  constructor(
    public source: NtSelectComponent,
    public value: any) { }
}

// export class NtSelectConfig {
//   maxHeight: number = 256;
// }

// export const NT_SELECT_CONFIG = new InjectionToken<NtSelectConfig>('nt-select-config');

@Component({
  selector: 'nt-select',
  templateUrl: 'select.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NtSelectComponent), multi: true },
    { provide: NT_OPTION_PARENT_COMPONENT, useExisting: NtSelectComponent }
  ],
  animations: [
    trigger('fold', [
      state('folded', style({ maxHeight: '256px' })),
      state('closed', style({ maxHeight: '0px' })),
      transition('* => folded', animate('300ms ease-in')),
      transition('* => closed', animate('300ms ease-out'))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-select',
    '(resize)': 'onResize($event)',
    '[class.open]': 'overlay.isOpen'
  }
})
export class NtSelectComponent implements AfterContentInit, ControlValueAccessor, NtOptionParentComponent {

  readonly origin: OverlayOrigin;

  private _disabled = false;
  private _state = '';
  private _width: number;
  private _multiple = false;
  private _value: any;
  private _viewValue: any;
  private _selectionModel: SelectionModel<NtOptionComponent>;

  get value() { return this._value; }
  get viewValue() { return this._viewValue || ''; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  get state() { return this._state; }
  get width() { return this._width; }

  @Input()
  set multiple(value: boolean) { this._multiple = coerceBooleanProperty(value); }
  get multiple() { return this._multiple; }

  /**
   * 选项是否可以过滤
   * TODO: 计划在 0.2.0 >= 版本中支持
   */
  get filter() { return false; }
  get selected(): NtOptionComponent | NtOptionComponent[] {
    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  @Input() placeholder = '';

  @ViewChild('input') input: ElementRef;
  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;
  @ContentChildren(NtOptionComponent) options: QueryList<NtOptionComponent>;

  private _compareWith = (o1: any, o2: any) => o1 === o2;
  private _onChange: (value: any) => void;
  private _onTouched: (value: any) => void;

  private readonly _destroy = new Subject<void>();

  @Output('ntSelectionChange')
  readonly selectionChange: EventEmitter<NtSelectChange> = new EventEmitter<NtSelectChange>();

  @Output('ntValueChange')
  readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  readonly optionSelectionChanges: Observable<NtOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.onSelectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple, undefined, false);
  }

  ngAfterContentInit() {
    this._width = this.input.nativeElement.clientWidth;
    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });
  }

  onResize(event: Event) {
    this._width = this.input.nativeElement.clientWidth;
  }

  onShow() {
    this._state = 'folded';
  }

  onClose() {
    this._state = 'closed';
  }

  onFocus() {
    if (!this.overlay.isOpen && !this._disabled) {
      this.overlay.show();
    }
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this._renderer.setProperty(this.input.nativeElement, 'value', this.viewValue);
    }
    this._value = value;
    this._onChange && this._onChange(value);
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
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

        // if (!this.multiple && this._panelOpen) {
        //   this.close();
        //   this.focus();
        // }
      });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map(option => option.stateChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
        // this.stateChanges.next();
      });

  }

  private _initializeSelection(): void {
    Promise.resolve().then(() => {
      this._setSelectionByValue(this.value);
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
      if (correspondingOption) {
        // this._keyManager.setActiveItem(this.options.toArray().indexOf(correspondingOption));
      }
    }

    this._changeDetectorRef.markForCheck();
  }

  private _selectValue(value: any, isUserInput = false): NtOptionComponent | undefined {
    const correspondingOption = this.options.find((option: NtOptionComponent) => {
      try {
        // Treat null as a special reset value.
        return option.value != null && this._compareWith(option.value, value);
      } catch (error) {
        if (isDevMode()) {
          // Notify developers of errors in their comparator.
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
    if (this._multiple) {
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

    // TODO(crisbeto): handle blank/null options inside multi-select.
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
}
