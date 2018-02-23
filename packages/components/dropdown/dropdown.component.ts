import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, ElementRef,
  Input, ViewChild, Renderer2, ViewEncapsulation
} from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent, NtOverlayTriggerType } from '../overlay';


@Component({
  selector: 'nt-dropdown, [nt-dropdown]',
  template: `
    <ng-content></ng-content>
    <nt-overlay
      [ntOrigin]="_origin"
      [ntPosition]="_positions"
      [ntTriggerType]="_triggerType">
      <ng-content select="nt-dropdown-pane"></ng-content>
    </nt-overlay>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': '_overlay.onClick()',
    '(mouseenter)': '_overlay.onMouseEnter()',
    '(mouseleave)': '_overlay.onMouseLeave()'
  }
})
export class NtDropdownComponent {

  _origin: OverlayOrigin;
  _positions = 'bottomLeft';
  _triggerType: NtOverlayTriggerType = 'hover';

  @ViewChild(NtOverlayComponent) _overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {

    this._origin = new OverlayOrigin(_elementRef);
  }

  @Input('ntPosition')
  set position(value: NtOverlayPosition) {
    this._positions = value;
  }

  @Input('ntTriggerType')
  set triggerType(value: NtOverlayTriggerType) {
    this._triggerType = value;
  }
}
