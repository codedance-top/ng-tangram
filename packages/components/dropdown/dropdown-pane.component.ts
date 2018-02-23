
import { Component, Input, ElementRef, Host, ViewEncapsulation, Renderer2 } from '@angular/core';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { NtOverlayPosition } from '../overlay';

export declare type NtDropdownPaneSize = '' | 'tiny' | 'small' | 'large';

@Component({
  selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
  template: `
  <div class="dropdown-pane {{_size}}">
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['dropdown-pane.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NtDropdownPaneComponent {

  _size = 'small';

  constructor(private _renderer: Renderer2) { }

  @Input('ntSize')
  set size(value: NtDropdownPaneSize) {
    this._size = value;
  }
}
