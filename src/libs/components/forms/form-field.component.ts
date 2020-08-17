import { defer, Observable, of, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
  ValidationErrors
} from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/components/core';

import { NtFormFieldControl } from './form-field-control';
import { NtFormLabelWidthDirective } from './form-label-width.directive';
import { NtFormOrientation, NtFormOrientationDirective } from './form-orientation.directive';

@Component({
  selector: 'nt-form-field',
  template: `
    <label class="nt-form-label"
      *ngIf="labelVisible"
      [ngStyle]="_labelStyles"
      [class.required]="markVisible && required">
      {{label}}
    </label>
    <div class="nt-form-group" [ngStyle]="_groupStyles">
      <ng-content></ng-content>
      <span class="form-error is-visible" *ngIf="_invalid && errors" [@fade]="_invalid">
        {{ errors | formError:label:messages }}
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
    '[class.nt-form-horizontal]': 'isHorizontal()'
  }
})
export class NtFormFieldComponent implements AfterContentInit, OnDestroy {

  private readonly _destroy = new Subject<void>();

  private _markVisible = true;

  private _isUnsetedWidthValue = true;

  private _ngForm: NgForm | FormGroupDirective | null = null;

  /** 表单宽度 （只在 horizontal 模式下起作用） */
  _labelStyles: any = {};

  _groupStyles: any = {};

  _invalid = false;

  @Input() label: string;

  /** 表单可见性 */
  private _labelVisible = true;

  @Input()
  get labelVisible() { return this._labelVisible; }
  set labelVisible(value: boolean) {
    this._labelVisible = coerceBooleanProperty(value);
  }

  private _labelWidth = 120;

  @Input()
  get labelWidth() { return this._labelWidth; }
  set labelWidth(value: number) {
    const coercedValue = coerceNumberProperty(value, 0);
    if (coercedValue > 0) {
      this._isUnsetedWidthValue = false;
      this._labelWidth = coercedValue;
    } else {
      this._isUnsetedWidthValue = true;
      this._labelWidth = 120;
    }
    this._setHorizontalStyles();
  }

  @Input() messages: { [key: string]: string };

  private _orientation;

  @Input()
  get orientation() { return this._orientation; }
  set orientation(value: NtFormOrientation) {
    this._orientation = value;
    this._setHorizontalStyles();
  }

  @Input()
  get markVisible() { return this._markVisible; }
  set markVisible(value: boolean) {
    this._markVisible = coerceBooleanProperty(value);
  }

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

  get errors(): ValidationErrors | null {
    return this.control.ngControl ? this.control.ngControl.errors : null;
  }

  // 表单模型
  // TODO: 支持多表单控件
  @ContentChild(NtFormFieldControl) control: NtFormFieldControl<any>;

  get ngControl(): NgControl | null { return this.control ? this.control.ngControl : null; }

  readonly statusChanges: Observable<any> = defer(() => {
    if (this.control && this.ngControl) {
      return this.ngControl.statusChanges ? this.ngControl.statusChanges : of(null);
    }
    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.statusChanges));
  });

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    @Optional() private _formLabelWidth: NtFormLabelWidthDirective,
    @Optional() private _formOrientation: NtFormOrientationDirective) {

    this._ngForm = parentForm || parentFormGroup;

    if (this._formLabelWidth) {
      this._subscribeContainerWidthChange();
    }

    if (this._formOrientation) {
      this._subscribeContainerOrientationChange();
    }

    this.statusChanges
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this._validate());
  }

  ngAfterContentInit() {
    if (this._ngForm && this.ngControl) {
      this._ngForm.ngSubmit
        .pipe(takeUntil(this._destroy))
        .subscribe(() => this._validate());
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  _clearValidateMessage() {
    this._invalid = false;
  }

  isHorizontal() {
    return this.orientation === 'horizontal';
  }

  isVertical() {
    return this.orientation === 'vertical';
  }

  private _validate() {
    if (this.ngControl) {
      this._invalid = !!this.ngControl.invalid;
      this._changeDetectorRef.markForCheck();
    }
  }

  private _subscribeContainerWidthChange() {
    this._formLabelWidth.widthChange
      .pipe(
        filter(() => this._isUnsetedWidthValue),
        takeUntil(this._destroy)
      )
      .subscribe(width => {
        this._labelWidth = width;
        this._setHorizontalStyles();
      });
  }

  private _subscribeContainerOrientationChange() {
    this._formOrientation.orientationChange
      .pipe(
        filter(() => !this._orientation),
        takeUntil(this._destroy)
      )
      .subscribe(orientation => {
        this._orientation = orientation;
        this._setHorizontalStyles();
      });

  }

  private _setHorizontalStyles() {
    if (this.labelWidth > 0 && this.isHorizontal()) {
      this._labelStyles['width.px'] = this.labelWidth;
      this._groupStyles['margin-left.px'] = this.labelWidth;
    } else {
      delete this._labelStyles['width.px'];
      delete this._groupStyles['margin-left.px'];
    }
  }
}
