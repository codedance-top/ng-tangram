import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, ElementRef, Host, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export declare type NtDropdownPaneSize = '' | 'tiny' | 'small' | 'large';

@Component({
  selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["dropdown-pane", size, class].join(" ")',
    '[class.autosize]': 'autosize'
  }
})
export class NtDropdownPaneComponent {

  private _arrow = false;

  private _autosize = false;

  @Input() size: NtDropdownPaneSize = 'small';

  @Input() class: string = '';

  @Input()
  set autosize(value: boolean) {
    this._autosize = coerceBooleanProperty(value);
  }
  get autosize() { return this._autosize; }

  @Input()
  set arrow(value: boolean) { this._arrow = coerceBooleanProperty(value); }
  get arrow() { return this._arrow; }
}
