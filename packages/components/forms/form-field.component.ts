import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, NgZone,
  OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl, AbstractControlDirective, ControlContainer, FormArray, FormArrayName,
  FormControl, FormControlName, FormGroup, NgControl, ValidationErrors
} from '@angular/forms';
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
      <div class="nt-form-inputs">
        <ng-content></ng-content>
      </div>
      <span class="form-error" [class.is-visible]="_invalid" [@fade]="_invalid">
        {{ errors | ntFormError :label }}
      </span>
    </div>
  `,

  animations: [
    trigger('fade', [
      transition('true => false', fadeOut(.15)),
      transition('false => true', fadeIn(.15))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    'tabindex': '0',
    'class': 'nt-form-field',
    '[class.has-error]': '_invalid',
    '[class.nt-form-horizontal]': 'labelHorizontally',
  }
})
export class NtFormFieldComponent implements AfterViewInit, OnDestroy {

  /** 表单可见性 */
  private _labelVisible = true;

  private readonly _destroy = new Subject<void>();

  _required = false;

  _invalid = false;

  _message: string;

  @Input() label: string;

  @Input()
  set labelVisible(value: boolean) { this._labelVisible = coerceBooleanProperty(value); }
  get labelVisible() { return this._labelVisible; }

  get labelHorizontally() { return this.labelOrientation === 'horizontal'; }

  get errors() {
    if (!this._controls || this._controls.length === 0) {
      return null;
    }
    return this._controls.map(control => control.errors)[0];
  }

  // @Input() inp

  @Input() labelOrientation: NtFormFieldOrientation;

  /** 表单正确时的样式 */
  @Input() validClass: string;

  /** 表单错误时的样式 */
  @Input() invalidClass: string;

  /** 表单模型 */
  @ContentChildren(FormControl) _controls: QueryList<FormControl>;

  /** 表单模型 */
  @ContentChildren(FormControlName) _controlContainers: QueryList<FormControlName>;

  readonly statusChanges: Observable<any> = defer(() => {
    if (this.controls) {
      return this.controls.map(control => control.statusChanges);
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.statusChanges));
  });

  readonly controls: Observable<AbstractControlDirective | AbstractControl> = defer(() => {

    if (this._controls && this._controlContainers) {
      return merge(
        ...this._controlContainers.map(control => control.statusChanges),
        ...this._controls.map(control => control.statusChanges)
      );
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.controls));
  });

  constructor(
    // @Inject(NT_FORM_CONFIG) _config:
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {

    merge([
      this._controls.changes.pipe(startWith(null), takeUntil(this._destroy)),
      this._controlContainers.changes.pipe(startWith(null), takeUntil(this._destroy))
    ])
      .subscribe(() => {
        this._resetValidation();
      });

    // console.log(this.aformControls);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private _resetValidation() {

    const changedOrDestroyed = merge(this._controls.changes, this._destroy);

    this.controls
      .pipe(takeUntil(changedOrDestroyed))
      .map(_ => this._controls.some(control => control.invalid) || this._controlContainers.some(control => control.invalid))
      .subscribe(valid => { this._invalid = valid; });


    merge(...this._controls.map(control => control.statusChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }
}
