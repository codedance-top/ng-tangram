import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  AfterContentInit, Component, ContentChild, ElementRef, Input,
  Renderer2, ViewChild, ViewEncapsulation, Output, EventEmitter
} from '@angular/core';
import {
  NtOverlayComponent, NtOverlayPosition, NtOverlayTriggerType
} from '@ng-tangram/components/core';
import { NtDropdownPaneComponent } from './dropdown-pane.component';

@Component({
  selector: 'nt-dropdown, [nt-dropdown]',
  templateUrl: 'dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()',
    '(mouseenter)': 'overlay.onMouseEnter()',
    '(mouseleave)': 'overlay.onMouseLeave()'
  }
})
export class NtDropdownComponent {

  readonly origin: CdkOverlayOrigin;

  @Input() position: NtOverlayPosition = NtOverlayPosition.BottomLeft;

  @Input() trigger: NtOverlayTriggerType = 'hover';

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  @ContentChild(NtDropdownPaneComponent) pane: NtDropdownPaneComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(_elementRef);
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
