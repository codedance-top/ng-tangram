
import { Component, ElementRef, Renderer2, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '../overlay';

@Component({
  selector: '[nt-tooltip]',
  template: `
  <ng-content></ng-content>
  <nt-overlay
    [ntOrigin]="_origin"
    [ntPosition]="_positions"
    ntTriggerType="hover"
    ntOverlayClass="tootip-overlay"
    ntArrowVisibled>
    <div class="tooltip">
      {{_title}}
    </div>
  </nt-overlay>
  `,
  styleUrls: ['tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(mouseenter)': '_overlay.onMouseEnter()',
    '(mouseleave)': '_overlay.onMouseLeave()'
  }
})

export class NtTooltipComponent {

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
