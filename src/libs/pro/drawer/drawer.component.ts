
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export declare type NtDrawerExpendedFrom = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'nt-drawer',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-drawer',
    '[class.is-expended]': 'expended',
  }
})
export class NtDrawerComponent {

  private _expended: boolean = false;

  @Input()
  get expended() { return this._expended; }
  set expended(value: boolean) {
    this._expended = coerceBooleanProperty(value);
  }

  private _expendFrom: NtDrawerExpendedFrom = 'right';

  @Input()
  get expendFrom() { return this._expendFrom; }
  set expendFrom(value: NtDrawerExpendedFrom) {
    this._expendFrom = value;
  }
}
