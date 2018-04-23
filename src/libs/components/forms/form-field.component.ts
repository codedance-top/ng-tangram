import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild,
  ContentChildren, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Optional,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

import { NtFormFieldControl } from './form-field-control';

export declare type NtFormFieldOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'nt-form-field',
  template: `
    <label class="nt-form-label" [class.required]="required" *ngIf="labelVisible">{{label}}</label>
    <div class="nt-form-group">
      <div class="nt-form-control">
        <ng-content></ng-content>
      </div>
      <span class="form-error is-visible" *ngIf="_invalid" [@fade]="_invalid">
        {{ (errors || {}) | ntFormError :label }}
      </span>
    </div>
  `,
  animations: [
    trigger('fade', [
      transition('* => false', fadeOut(.15)),
      transition('* => true', fadeIn(.15))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-form-field',
    '[class.nt-form-error]': '_invalid',
    '[class.nt-form-horizontal]': 'horizontal'
  }
})
export class NtFormFieldComponent implements AfterViewInit, OnDestroy {

  /** 表单可见性 */
  private _labelVisible = true;

  private readonly _destroy = new Subject<void>();

  _invalid = false;

  @Input() label: string;

  @Input()
  set labelVisible(value: boolean) { this._labelVisible = coerceBooleanProperty(value); }
  get labelVisible() { return this._labelVisible; }

  get horizontal() { return this.orientation === 'horizontal'; }

  get required() {

    if (this.ngControl &&
      this.ngControl.control &&
      this.ngControl.control.validator) {
      const control = new FormControl();
      const validateResult = this.ngControl.control.validator(control);
      return validateResult && validateResult.hasOwnProperty('required');
    }

    if (this.control) {
      return !!this.control.required;
    }

    return false;
  }

  get errors() { return this.control.ngControl ? this.control.ngControl.errors : null; }

  @Input() orientation: NtFormFieldOrientation;

  /** 表单正确时的样式 */
  // @Input() validClass: string;

  /** 表单错误时的样式 */
  // @Input() invalidClass: string;

  /** 表单模型 */
  @ContentChild(NtFormFieldControl) control: NtFormFieldControl<any>;

  get ngSubmit(): Observable<any> {
    if (this._parentForm || this._parentFormGroup) {
      return (this._parentForm || this._parentFormGroup || <any>{}).ngSubmit;
    }
    return null;
  }

  get ngControl(): NgControl | null { return this.control ? this.control.ngControl : null; }

  readonly statusChanges: Observable<any> = defer(() => {
    if (this.control && this.ngControl) {
      return this.ngControl.statusChanges ? this.ngControl.statusChanges : Observable.of(null);
    }
    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.statusChanges));
  });

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective) {
    this.statusChanges.pipe(takeUntil(this._destroy)).subscribe(() => this._validate());
  }

  ngAfterViewInit() {
    if (this.ngSubmit && this.ngControl) {
      this.ngSubmit.pipe(takeUntil(this._destroy)).subscribe(() => this._validate());
    }
  }

  private _validate() {
    if (this.ngControl) {
      this._invalid = !!this.ngControl.invalid;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
