import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, ElementRef, Host, Input, Renderer2, ViewEncapsulation } from '@angular/core';

export declare type NtDropdownPaneSize = '' | 'tiny' | 'small' | 'large';

@Component({
  selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
  templateUrl: 'dropdown-pane.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NtDropdownPaneComponent {
  @Input() size: NtDropdownPaneSize = 'small';
}
