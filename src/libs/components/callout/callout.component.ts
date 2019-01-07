import { transition, trigger, AnimationEvent } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
import { fadeOut } from '@ng-tangram/animate/fading';

export declare type NtCalloutColor = 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtCalloutSize = 'small' | 'large' | 'medium';

@Component({
  selector: 'nt-callout',
  template: `
    <h3 *ngIf="title">{{title}}</h3>
    <ng-content></ng-content>
    <button *ngIf="this.closable" (click)="_close()" class="close-button" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeOut', [
      transition('* => true', fadeOut(.3))
    ])
  ],
  host: {
    '[class]': '["callout nt-callout", color || "primary", size, class].join(" ")',
    '[class.closed]': 'closed'
  }
})
export class NtCalloutComponent {

  @Input() title: string = '';

  @Input() color: NtCalloutColor = 'primary';

  @Input() size: NtCalloutSize = 'medium';

  @Input() class: string = '';

  private _closed = false;

  get closed() { return this._closed; }

  private _closable: boolean;

  @Input()
  set closable(value: boolean) { this._closable = coerceBooleanProperty(value); }
  get closable() { return this._closable; }

  @Output() close = new EventEmitter<any>();

  @HostBinding('@fadeOut') fadeOut = false;

  @HostListener('@fadeOut.done', ['$event'])
  onAnimationDone(event: AnimationEvent): void {
    if (event.toState) {
      this._closed = true;
    }
  }

  constructor() { }

  _close() {
    if (!this.fadeOut) {
      this.fadeOut = true;
      this.close.emit();
    }
  }
}
