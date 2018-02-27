import { Component, Input, OnInit, ViewEncapsulation, ContentChildren, QueryList, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from "@angular/forms";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

export declare type NtFormFieldOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'nt-form-field',
  template: `
    <label class="form-label" *ngIf="labelVisible">{{label}}</label>
    <div class="form-group">
      <ng-content></ng-content>
      <span class="form-error">{{label}} Invalid</span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'form-field',
    '[class.form-inline]': 'orientation === "horizontal"'
  }
})
export class NtFormFieldComponent implements AfterViewInit {

  @Input('ntLabel') label: string;
  @Input('ntLabelVisible') labelVisible = true;
  @Input('ntOrientation') orientation: NtFormFieldOrientation;

  @ContentChildren(FormControlName) formControls: QueryList<FormControl | FormControlName>;

  private _subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2) {
  }

  ngAfterViewInit() {
    let controls = this.formControls
      .toArray()
      .concat();

    controls.forEach(control => this._subscriptions.push(
      control.statusChanges
        .subscribe(() => {
          if (controls.some(control => control.valid)) {
            this.render.removeClass(this.elementRef.nativeElement, 'has-error');
          } else {
            this.render.addClass(this.elementRef.nativeElement, 'has-error');
          }
        }))
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
