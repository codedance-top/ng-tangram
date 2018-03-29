import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtButtonGroupColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtButtonGroupSize = '' | 'tiny' | 'small' | 'large' | 'medium';

@Component({
  selector: 'nt-button-group, [nt-button-group]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["button-group", color, size].join(" ")',
    '[class.expanded]': 'expanded'
  }
})
export class NtButtonGroupComponent {

  private _expanded: boolean = false;

  @Input() color: NtButtonGroupColor = '';

  @Input() size: NtButtonGroupSize = '';

  @Input()
  set expanded(value: boolean) { this._expanded = coerceBooleanProperty(value); }
  get expanded() { return this._expanded; }
}
