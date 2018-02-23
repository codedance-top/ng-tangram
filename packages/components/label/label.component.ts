
import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtLabelColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';

@Component({
  selector: 'nt-label, [nt-label]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_class.join(" ")'
  }
})

export class NtLabelComponent {
  _class: string[] = ['label'];
  _color: NtLabelColor = '';

  @Input('ntColor')
  set color(value: NtLabelColor) {
    this._color = value;
    this._setClass();
  }

  private _setClass() {
    this._class = this._class.slice(0, 1);
    this._color && this._class.push(this._color);
  }
}
