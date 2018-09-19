
import { defer, Observable, Subject, of as observableOf } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, NgZone,
  OnDestroy, Optional, ViewEncapsulation, ContentChildren, QueryList
} from '@angular/core';
import {
  FormControl, FormGroupDirective, NgControl, NgForm, ValidationErrors
} from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

import { NtFormFieldControl } from './form-field-control';
import { NtFormLabelWidthDirective } from './form-label-width.directive';
import { NtFormOrientation, NtFormOrientationDirective } from './form-orientation.directive';

@Component({
  selector: 'nt-form-field',
  template: `
    <label class="nt-form-label" [ngStyle]="_labelStyles" [class.required]="required" *ngIf="labelVisible">{{label}}</label>
    <div class="nt-form-group" [ngStyle]="_groupStyles">
      <div class="nt-form-control">
        <ng-content></ng-content>
      </div>
      <span class="form-error is-visible" *ngIf="_invalid && errors" [@fade]="_invalid">
        {{ errors | ntFormError:label:messages }}
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

  private readonly _destroy = new Subject<void>();

  /** 表单可见性 */
  private _labelVisible = true;

  private _labelWidth;

  private _orientation;

  private _selfLabelWidth = false;

  private _selfOrientation = false;

  /** 表单宽度 （只在 horizontal 模式下起作用） */
  _labelStyles: any = {};

  _groupStyles: any = {};

  _invalid = false;

  @Input() label: string;

  @Input()
  set labelVisible(value: boolean) { this._labelVisible = coerceBooleanProperty(value); }
  get labelVisible() { return this._labelVisible; }

  @Input()
  set labelWidth(value: number) {
    this._labelWidth = coerceNumberProperty(value, 0);
    this._selfLabelWidth = this._labelWidth > 0;
    this._setHorizontalStyles();
  }
  get labelWidth() { return this._labelWidth || 120; }

  @Input() messages: { [key: string]: string };

  @Input()
  set orientation(value: NtFormOrientation) {
    this._orientation = value;
    this._selfOrientation = true;
    this._setHorizontalStyles();
  }
  get orientation() { return this._orientation; }

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

  get errors(): ValidationErrors | null {
    return this.control.ngControl ? this.control.ngControl.errors : null;
  }

  // 表单模型
  // TODO: 支持多表单控件
  @ContentChild(NtFormFieldControl) control: NtFormFieldControl<any>;


  get ngSubmit(): Observable<any> | null {
    if (this._parentForm || this._parentFormGroup) {
      return (this._parentForm || this._parentFormGroup || <any>{}).ngSubmit;
    }
    return null;
  }

  get ngControl(): NgControl | null { return this.control ? this.control.ngControl : null; }

  readonly statusChanges: Observable<any> = defer(() => {
    if (this.control && this.ngControl) {
      return this.ngControl.statusChanges ? this.ngControl.statusChanges : observableOf(null);
    }
    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.statusChanges));
  });

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective,
    @Optional() private _formLabelWidth: NtFormLabelWidthDirective,
    @Optional() private _formOrientation: NtFormOrientationDirective) {

    if (this._formLabelWidth) {
      this._formLabelWidth.widthChange.pipe(takeUntil(this._destroy), filter(() => !this._selfLabelWidth))
        .subscribe(width => {
          this._labelWidth = width;
          this._setHorizontalStyles();
        });
    }

    if (this._formOrientation) {
      this._formOrientation.orientationChange.pipe(takeUntil(this._destroy), filter(() => !this._selfOrientation))
        .subscribe(orientation => {
          this._orientation = orientation;
          this._setHorizontalStyles();
        });
    }

    this.statusChanges.pipe(takeUntil(this._destroy)).subscribe(() => this._validate());
  }

  ngAfterViewInit() {

    if (this.ngSubmit && this.ngControl) {
      this.ngSubmit.pipe(takeUntil(this._destroy)).subscribe(() => this._validate());
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private _validate() {
    if (this.ngControl) {
      this._invalid = !!this.ngControl.invalid;
      this._changeDetectorRef.markForCheck();
    }
  }

  private _setHorizontalStyles() {
    if (this.labelWidth > 0 && this.horizontal) {
      this._labelStyles['width.px'] = this.labelWidth;
      this._groupStyles['margin-left.px'] = this.labelWidth;
    } else {
      delete this._labelStyles['width.px'];
      delete this._groupStyles['margin-left.px'];
    }
  }
}
