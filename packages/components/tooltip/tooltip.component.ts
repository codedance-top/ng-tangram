
import { Component, ElementRef, Renderer2, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '@ng-tangram/components/_core/overlay';

@Component({
  selector: '[nt-tooltip]',
  templateUrl: 'tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(mouseenter)': 'overlay.onMouseEnter()',
    '(mouseleave)': 'overlay.onMouseLeave()'
  }
})

export class NtTooltipComponent {

  readonly origin: OverlayOrigin;

  @Input('ntTitle') title = '';
  @Input('ntPosition') positions: NtOverlayPosition = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }
}
