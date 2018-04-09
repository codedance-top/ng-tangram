import { AnimationEvent, transition, trigger } from '@angular/animations';
import { OverlayOrigin } from '@angular/cdk/overlay';
import {
  Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/core';

@Component({
  selector: '[nt-popover]',
  templateUrl: 'popover.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()'
  }
})
export class NtPopoverComponent {

  readonly origin: OverlayOrigin;

  @Input('nt-popover') title = '';
  @Input() position = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }
}
