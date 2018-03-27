import { OverlayOrigin } from '@angular/cdk/overlay';
import {
  Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/core/overlay';

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

  @Input('nt-tooltip') title = '';
  @Input() position: NtOverlayPosition = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }
}
