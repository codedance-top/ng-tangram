
import { Component, Input, Output, ElementRef, EventEmitter, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '../overlay';

import { AnimationEvent, trigger, transition } from '@angular/animations';
import { fadeIn, fadeOut } from '../../animate/fading';

@Component({
  selector: '[nt-popover]',
  template: `
  <ng-content></ng-content>
  <nt-overlay
    [ntOrigin]="_origin"
    [ntPosition]="_positions"
    ntTriggerType="click" ntArrowVisibled>
    <div class="dropdown-pane small popover">
      <div class="popover-title" *ngIf="_title">{{_title}}</div>
      <div class="popover-pane">
        <ng-content select="nt-popover-pane"></ng-content>
      </div>
    </div>
  </nt-overlay>
  `,
  styleUrls: ['popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': '_overlay.onClick()'
  }
})
export class NtPopoverComponent {

  _title = '';
  _origin: OverlayOrigin;
  _positions = 'top';

  @ViewChild(NtOverlayComponent) _overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this._origin = new OverlayOrigin(_elementRef);
  }

  @Input('ntTitle')
  set title(value: string) {
    this._title = value;
  }

  @Input('ntPosition')
  set position(value: NtOverlayPosition) {
    this._positions = value;
  }
}
