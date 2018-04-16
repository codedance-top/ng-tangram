import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, ElementRef, Host, Input, Renderer2, ViewEncapsulation } from '@angular/core';

export declare type NtDropdownPaneSize = '' | 'tiny' | 'small' | 'large';

@Component({
  selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["dropdown-pane", size, class].join(" ")'
  }
})
export class NtDropdownPaneComponent {
  @Input() size: NtDropdownPaneSize = 'small';

  @Input() class: string = '';
}
