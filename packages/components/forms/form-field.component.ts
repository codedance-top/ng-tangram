import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnChanges, OnDestroy, OnInit,
  QueryList, Renderer2, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';

import { NtFormFieldControl } from './form-field-control';
import { NtFormConfig } from './invalid-handler';

export declare type NtFormFieldOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'nt-form-field',
  template: `
    <label class="form-label" *ngIf="labelVisible">{{label}}</label>
    <div class="form-group">
      <div class="form-input">
        <ng-content></ng-content>
      </div>
      <span class="form-error" [@fade]="_invalid">{{ label }} Invalid</span>
    </div>
  `,
  animations: [
    trigger('fade', [
      transition('* => false', fadeOut(.15)),
      transition('* => true', fadeIn(.15))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-form-field',
    '[class.has-error]': '_invalid',
    '[class.form-static]': 'labelHorizontally',
  }
})
export class NtFormFieldComponent implements AfterViewInit, OnDestroy, OnChanges {

  /** 表单可见性 */
  private _labelVisible = true;

  private _subscriptions: Subscription[] = [];

  _config: NtFormConfig;

  _required = false;

  _invalid = false;

  @Input('ntLabel') label: string;

  @Input('ntLabelVisible')
  set labelVisible(value: boolean) { this._labelVisible = coerceBooleanProperty(value); }
  get labelVisible() { return this._labelVisible; }

  get labelHorizontally() { return this.labelOrientation === "horizontal"; }

  get errors() { return true; }

  @Input('ntLabelOrientation') labelOrientation: NtFormFieldOrientation;

  /** 表单模型 */
  @ContentChildren(FormControlName) formControls: QueryList<FormControlName>;

  /** 表单正确时的样式 */
  @ContentChildren('ntFormValidClass') _validClass: string;

  /** 表单错误时的样式 */
  @ContentChildren('ntFormInvalidClass') _invalidClass: string;

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2) { }

  ngAfterViewInit() {

    const controls = this.formControls.toArray().concat();
    controls.forEach(control => this._subscriptions.push(
      control.statusChanges.subscribe(() => {
        this._invalid = !controls.some(control => control.valid);
      }))
    );
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
