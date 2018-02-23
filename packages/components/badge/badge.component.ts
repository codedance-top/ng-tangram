
import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtBadgeColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';

@Component({
  selector: 'nt-badge, [nt-badge]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_class.join(" ")'
  }
})

export class NtBadgeComponent {
  _class: string[] = ['badge'];
  _color: NtBadgeColor = '';

  @Input('ntColor')
  set color(value: NtBadgeColor) {
    this._color = value;
    this._setClass();
  }

  private _setClass() {
    this._class = this._class.slice(0, 1);
    this._color && this._class.push(this._color);
  }
}
