import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation
} from '@angular/core';

export declare type NtButtonType = '' | 'hollow' | 'clear';
export declare type NtButtonColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtButtonSize =  '' | 'tiny' | 'small' | 'large' | 'medium';

@Component({
  selector: '[nt-button]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["button", color, size, type].join(" ")',
    '[class.expanded]': 'expanded'
  }
})
export class NtButtonComponent {

  @Input('ntColor') color: NtButtonColor = '';
  @Input('ntSize') size: NtButtonSize = '';
  @Input('ntType') type: NtButtonType = '';

  private _expanded: boolean = false;

  @Input('ntExpanded')
  set expanded(value: boolean) { this._expanded = coerceBooleanProperty(value); }
  get expanded() { return this._expanded; }

  constructor() { }
}
