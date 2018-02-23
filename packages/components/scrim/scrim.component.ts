
import { Component, ElementRef, Renderer2, Input, ViewEncapsulation } from '@angular/core';
import { NtScrimService } from './scrim.service';

import { trigger, transition, AnimationEvent } from '@angular/animations';
import { fadeIn, fadeOut } from '../../animate/fading';

@Component({
  selector: '[nt-scrim], [npScrim]',
  template: `
    <ng-content></ng-content>
    <div [@fade] class="nt-scrim" *ngIf="_isOpen">
        <div class="nt-scrim-animation">
          <div class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
          </div>
        </div>
        <h3 class="nt-scrim-text">{{_text}}</h3>
    </div>
  `,
  styleUrls: ['scrim.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.15)),
      transition('* => void', fadeOut(.15))
    ])
  ]
})
export class NtScrimComponent {

  _isOpen = false;
  _text = '正在加载';

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef) {
  }

  @Input('ntOpenScrim')
  set open(value: boolean) {
    this._isOpen = value;
    const style = window.getComputedStyle(this.elementRef.nativeElement);
    if (style.position !== 'absolute' || style.position !== 'absolute') {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    }
  }

  @Input('ntScrimText')
  set text(value: string) {
    this._text = value;
  }
}
