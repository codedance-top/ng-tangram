import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { switchMap, take, takeUntil, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, isDevMode, Component, ContentChildren, EventEmitter, Input, NgZone, OnDestroy, Optional,
  QueryList, Self, ViewEncapsulation, ChangeDetectorRef, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { NtCheckboxChange, NtCheckboxComponent } from './checkbox.component';
import { SelectionModel } from '@angular/cdk/collections';

export function getNtCheckboxGroupNonFunctionValueError() {
  return Error('`compareWith` must be a function.');
}

let uniqueId = 0;

@Component({
  selector: 'nt-checkbox-group',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtCheckboxGroupComponent }
  ],
  host: {
    class: 'nt-checkbox-group nt-form-control'
  }
})
export class NtCheckboxGroupComponent<T> extends NtFormFieldControl<T[]>
  implements ControlValueAccessor, AfterViewInit, OnDestroy {

  readonly id: string = `nt-checkbox-group-${uniqueId++}`;

  private readonly _destroy = new Subject<void>();

  private _value: T[];
  private _disabled = false;
  private _readonly = false;
  private _required = false;

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

  @ContentChildren(NtCheckboxComponent) checkboxes: QueryList<NtCheckboxComponent<any>>;

  private _compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw getNtCheckboxGroupNonFunctionValueError();
    } else {
      this._compareWith = fn;
    }
  }

  readonly checkedChanges: Observable<NtCheckboxChange<T>> = defer(() => {
    if (this.checkboxes) {
      return merge(...this.checkboxes.map(item => item.change));
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
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit() {
    this.checkboxes.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._initializeChecked();
    });

    this.checkedChanges.pipe(takeUntil(this._destroy)).subscribe(() => {
      this._setValues();
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  writeValue(value: T[]) {
    if (this.checkboxes) {
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
      this._setCheckedByValue(this.ngControl ? this.ngControl.value : this.value);
    });
  }

  private _setCheckedByValue(value: T[]) {
    if (value) {
      this._value = value;
      this.checkboxes.forEach(item => item.checked = false);
      value.forEach(val => this._checkedValue(val));
      this._changeDetectorRef.markForCheck();
    }
  }

  private _checkedValue(value: any): NtCheckboxComponent<T> | undefined {
    const correspondingItem = this.checkboxes.find((item: NtCheckboxComponent<T>) => {
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

  private _setValues(): void {
    this._value = [];
    this.checkboxes.forEach(item => {
      if (item.checked && !!item.value) {
        this._value.push(item.value);
      }
    });
    this._onChange(this._value);
    this._onTouched();
    this._changeDetectorRef.markForCheck();
  }
}