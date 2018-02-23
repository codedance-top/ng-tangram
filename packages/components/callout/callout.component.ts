import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { trigger, transition } from '@angular/animations';
import { fadeOut } from '../../animate/fading';

export declare type NtCalloutColor = 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtCalloutSize = 'small' | 'large' | 'medium';

@Component({
  selector: 'nt-callout',
  template: `
    <div *ngIf="_display" [@fadeOut] class="callout {{_size}} {{_color}}">
      <h3 *ngIf="_title">{{_title}}</h3>
      <ng-content></ng-content>
      <button *ngIf="this._closable" (click)="close()" class="close-button" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `,
  styleUrls: ['callout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeOut', [
      transition('* => void', fadeOut(.3))
    ])
  ]
})
export class NtCalloutComponent {

  _title: string;
  _color: NtCalloutColor = 'primary';
  _size: NtCalloutSize = 'medium';
  _display = true;
  _closable: boolean;

  @Output('ntOnClose') onClose = new EventEmitter<any>();

  constructor() { }

  @Input('ntColor')
  set color(value: NtCalloutColor) {
    this._color = value;
  }

  @Input('ntTitle')
  set title(value: string) {
    this._title = value;
  }

  @Input('ntSize')
  set size(value: NtCalloutSize) {
    this._size = value;
  }

  @Input('ntClosable')
  set closable(value: boolean) {
    this._closable = value === false ? false : true;
  }

  close() {
    if (this._display) {
      this._display = false;
      this.onClose.emit();
    }
  }
}
