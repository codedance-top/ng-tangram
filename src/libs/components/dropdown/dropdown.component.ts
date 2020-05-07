import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/overlay';

import {
  NT_DROPDOWN_PARENT_COMPONENT,
  NtDropdownPaneComponent,
  NtDropdownParentComponent
} from './dropdown-pane.component';

export declare type NtDropdownTriggerType = '' | 'hover' | 'click';

@Component({
  selector: 'nt-dropdown, [nt-dropdown]',
  templateUrl: 'dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': '_onClick($event)',
    '(mouseenter)': '_onMouseEnter($event)',
    '(mouseleave)': '_onMouseLeave($event)'
  },
  providers: [
    { provide: NT_DROPDOWN_PARENT_COMPONENT, useExisting: NtDropdownComponent }
  ]
})
export class NtDropdownComponent implements NtDropdownParentComponent {

  readonly origin: CdkOverlayOrigin;

  @Input() position: NtOverlayPosition = NtOverlayPosition.BottomLeft;

  @Input() trigger: NtDropdownTriggerType = 'hover';

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent, { static: true }) overlay: NtOverlayComponent;

  @ContentChild(NtDropdownPaneComponent) pane: NtDropdownPaneComponent;

  constructor(_elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(_elementRef);
  }

  _onClick(_: Event) {
    if (this.trigger === 'click') {
      this.overlay.toggle();
    }
  }

  _onMouseEnter(_: Event) {
    if (this.trigger === 'hover') {
      this.overlay.markOpen();
    }
  }

  _onMouseLeave(_: Event) {
    if (this.trigger === 'hover') {
      this.overlay.markClose();
    }
  }

  _afterOpen(event: any) {
    this.afterOpen.next(event);
  }

  _afterClosed(event: any) {
    this.afterClosed.next(event);
  }

  _beforeOpen(event: any) {
    this.beforeOpen.next(event);
  }

  _beforeClosed(event: any) {
    this.beforeClosed.next(event);
  }

  _positionChange(change: ConnectedOverlayPositionChange) {
    this.positionChange.next(change);
  }
}
