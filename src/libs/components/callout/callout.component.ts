import { AnimationEvent, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { fadeOut } from '@ng-tangram/components/core';

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

  /**
   * 定义此属性是为了避免内部的动态样式 class 和外部设置的值起冲突，所以用此属性接收外部的值并且合并 class 来避免这个问题。
   *
   * TODO: 官方会在 Ivy Renderer 中修复这个问题，预计会在 Angular 9.0。
   * 有关此问题的Issue: https://github.com/angular/angular/issues/7289
   * @deprecated > 0.6.0
   */
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
