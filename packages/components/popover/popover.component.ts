
import { Component, Input, Output, ElementRef, EventEmitter, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '@ng-tangram/components/_core/overlay';

import { AnimationEvent, trigger, transition } from '@angular/animations';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

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

  @Input('ntTitle') title = '';
  @Input('ntPosition') position = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }
}
