import { Component, Input, OnInit, ViewEncapsulation, ContentChildren, QueryList, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from "@angular/forms";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

export declare type NtFormFieldOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'nt-form-field',
  template: `
    <label class="form-label" *ngIf="_labelVisible">{{_label}}</label>
    <div class="form-group">
      <ng-content></ng-content>
      <span class="form-error">{{_label}} 验证错误</span>
    </div>
  `,
  styleUrls: ['form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'form-field',
    '[class.form-inline]': '_orientation === "horizontal"'
  }
})
export class NtFormFieldComponent implements AfterViewInit {

  _label: string;
  _labelVisible = true;
  _orientation: NtFormFieldOrientation;

  // @ContentChildren(FormControl) formControls: QueryList<FormControl>;
  @ContentChildren(FormControlName) formControlNames: QueryList<FormControlName>;

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2) {
  }

  @Input('ntLabel')
  set label(value: string) {
    this._label = value;
  }

  @Input('ntLabelVisible')
  set labelVisible(value: string) {

  }

  @Input('ntOrientation')
  set orientation(value: NtFormFieldOrientation) {
    this._orientation = value;
  }

  ngAfterViewInit() {
    let controlNames = this.formControlNames
      .toArray()
      .map(controlName => controlName);

    controlNames.forEach(control => this.subscriptions.push(
      control.statusChanges
        .subscribe(() => {
          if (controlNames.some(control => control.valid)) {
            this.render.removeClass(this.elementRef.nativeElement, 'has-error');
          } else {
            this.render.addClass(this.elementRef.nativeElement, 'has-error');
          }
        }))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
