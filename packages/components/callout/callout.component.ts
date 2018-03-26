import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { fadeOut } from '@ng-tangram/animate/fading';

export declare type NtCalloutColor = 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtCalloutSize = 'small' | 'large' | 'medium';

@Component({
  selector: 'nt-callout',
  templateUrl: 'callout.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeOut', [
      transition('* => void', fadeOut(.3))
    ])
  ]
})
export class NtCalloutComponent {

  private _display = true;
  private _closable: boolean;

  get display() { return this._display; }

  @Input('ntTitle') title: string = '';

  @Input('ntColor') color: NtCalloutColor = 'primary';

  @Input('ntSize') size: NtCalloutSize = 'medium';

  @Input('ntClosable')
  set closable(value: boolean) { this._closable = coerceBooleanProperty(value); }
  get closable() { return this._closable; }

  @Output('ntOnClose') onClose = new EventEmitter<any>();

  constructor() { }

  close() {
    if (this._display) {
      this._display = false;
      this.onClose.emit();
    }
  }
}
