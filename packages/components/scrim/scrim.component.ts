
import { Component, ElementRef, Renderer2, Input, ViewEncapsulation } from '@angular/core';
import { NtScrimService } from './scrim.service';

import { trigger, transition, AnimationEvent } from '@angular/animations';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

@Component({
  selector: '[nt-scrim], [ntScrim]',
  templateUrl: 'scrim.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.15)),
      transition('* => void', fadeOut(.15))
    ])
  ]
})
export class NtScrimComponent {

  private _isOpen = false;

  @Input('ntScrimText') text = 'Loading...';

  @Input('ntOpenScrim')
  set isOpen(value: boolean) {
    this._isOpen = value;
    const style = window.getComputedStyle(this.elementRef.nativeElement);
    if (style.position !== 'absolute' || style.position !== 'absolute') {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    }
  }
  get isOpen() { return this._isOpen; }


  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef) {
  }
}
