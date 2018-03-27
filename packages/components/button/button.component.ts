import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation
} from '@angular/core';

export declare type NtButtonStyle = '' | 'hollow' | 'clear';
export declare type NtButtonColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtButtonSize =  '' | 'tiny' | 'small' | 'large' | 'medium';

@Component({
  selector: '[nt-button]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["button", color, style, type].join(" ")',
    '[class.expanded]': 'expanded'
  }
})
export class NtButtonComponent {

  @Input() color: NtButtonColor = '';
  @Input() style: NtButtonSize = '';
  @Input() type: NtButtonStyle = '';

  private _expanded: boolean = false;

  @Input()
  set expanded(value: boolean) { this._expanded = coerceBooleanProperty(value); }
  get expanded() { return this._expanded; }

  constructor() { }
}
