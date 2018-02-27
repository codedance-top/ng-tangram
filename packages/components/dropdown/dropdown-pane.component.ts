
import { Component, Input, ElementRef, Host, ViewEncapsulation, Renderer2 } from '@angular/core';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

export declare type NtDropdownPaneSize = '' | 'tiny' | 'small' | 'large';

@Component({
  selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
  templateUrl: 'dropdown-pane.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NtDropdownPaneComponent {
  @Input('ntSize') size: NtDropdownPaneSize = 'small';
}
