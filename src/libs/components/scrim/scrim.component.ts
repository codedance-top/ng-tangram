import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

@Component({
  selector: '[nt-scrim], nt-scrim',
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

  @Input() text = '';

  set isOpen(value: boolean) { this._isOpen = coerceBooleanProperty(value); }
  get isOpen() { return this._isOpen; }

  constructor() { }
}
