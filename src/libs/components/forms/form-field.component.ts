import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild,
  ContentChildren, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Optional,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

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
    <label class="nt-form-label" *ngIf="labelVisible">{{label}}</label>
    <div class="nt-form-group">
      <div class="nt-form-control">
        <ng-content></ng-content>
      </div>
      <span class="form-error is-visible" *ngIf="_invalid" [@fade]="_invalid">
        {{ errors | ntFormError :label }}
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
    '[class.has-error]': '_invalid',
    '[class.nt-form-horizontal]': 'horizontal',
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

  get required() { return this.control.required; }

  get errors() { return this.control.ngControl.errors; }

  @Input() orientation: NtFormFieldOrientation;

  /** 表单正确时的样式 */
  // @Input() validClass: string;

  /** 表单错误时的样式 */
  // @Input() invalidClass: string;

  /** 表单模型 */
  @ContentChild(NtFormFieldControl) control: NtFormFieldControl<any>;

  get ngSubmit() { return (this._parentForm || this._parentFormGroup || <any>{}).ngSubmit || null; }

  get ngControl() { return this.control.ngControl || null; }

  readonly statusChanges: Observable<any> = defer(() => {
    if (this.control) {
      return this.ngControl ? this.ngControl.statusChanges : null;
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
      this._invalid = this.ngControl.invalid;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
