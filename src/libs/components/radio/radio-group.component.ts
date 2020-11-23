import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  isDevMode,
  NgZone,
  OnDestroy,
  Optional,
  QueryList,
  Self,
  ViewEncapsulation,
  Output
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { NtRadioChange, NtRadioComponent } from './radio.component';

export function getNtRdioGroupNonFunctionValueError() {
  return Error('`compareWith` must be a function.');
}

let uniqueId = 0;

@Component({
  selector: 'nt-radio-group',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtRadioGroupComponent }
  ],
  host: {
    'class': 'nt-radio-group'
  }
})
export class NtRadioGroupComponent<T>
  implements ControlValueAccessor, AfterViewInit, OnDestroy,  NtFormFieldControl<T> {

  readonly id: string = `nt-radio-group-${uniqueId++}`;

  private readonly _destroy = new Subject<void>();

  private _value: T | null;
  private _disabled = false;
  private _readonly = false;
  private _required = false;

  private _name: string = this.id;

  get value() { return this._value; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  @Input()
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  get readonly() { return this._readonly; }

  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  @ContentChildren(NtRadioComponent) radios: QueryList<NtRadioComponent<T>>;

  private _compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw getNtRdioGroupNonFunctionValueError();
    } else {
      this._compareWith = fn;
    }
  }

  @Output() readonly checkedChanges: Observable<NtRadioChange<T>> = defer(() => {
    if (this.radios) {
      return merge<NtRadioChange<T>>(...this.radios.map(item => item.change));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.checkedChanges));
  });

  /** Emits when the value changes (either due to user input or programmatic change). */
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit() {
    this.radios.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetRadios();
      this._initializeChecked();
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  writeValue(value: T) {
    if (this.radios) {
      this._setCheckedByValue(value);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  focus() {
    if (!this.disabled) {
      this._onTouched();
    }
  }

  private _initializeChecked(): void {
    Promise.resolve().then(() => {
      this._updateRadioButtonNames();
      this._setCheckedByValue(this.ngControl ? this.ngControl.value : this.value);
    });
  }

  private _resetRadios() {

    const changedOrDestroyed = merge(this.radios.changes, this._destroy);

    this.checkedChanges.pipe(takeUntil(changedOrDestroyed)).subscribe(change => {
      this._setValues(change.source);
    });

    merge(...this.radios.map(item => item.change))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  private _setCheckedByValue(value: T) {
    this._value = value;
    this.radios.forEach(item => item.checked = false);
    this._checkedValue(value);
    this._changeDetectorRef.markForCheck();
  }

  private _checkedValue(value: any): NtRadioComponent<T> | undefined {
    const correspondingItem = this.radios.find((item: NtRadioComponent<T>) => {
      try {
        return item.value != null && this._compareWith(item.value, value);
      } catch (error) {
        if (isDevMode()) {
          console.warn(error);
        }
        return false;
      }
    });
    if (correspondingItem) {
      correspondingItem.checked = true;
    }
    return correspondingItem;
  }

  private _setValues(radio: NtRadioComponent<T>): void {

    this._value = radio.value;
    this._onChange(this._value);
    this._onTouched();
    this._changeDetectorRef.markForCheck();
  }

  private _updateRadioButtonNames(): void {
    if (this.radios) {
      this.radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }
}
