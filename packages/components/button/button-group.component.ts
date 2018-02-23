import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtButtonGroupColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtButtonGroupSize = '' | 'tiny' | 'small' | 'large' | 'medium';

@Component({
  selector: 'nt-button-group, [nt-button-group]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_class.join(" ")'
  }
})

export class NtButtonGroupComponent {
  _class: string[] = ['button-group'];
  _color: NtButtonGroupColor = '';
  _size: NtButtonGroupSize = '';
  _expanded: boolean = false;

  @Input('ntColor')
  set color(value: NtButtonGroupColor) {
    this._color = value;
    this._setClass();
  }

  @Input('ntSize')
  set size(value: NtButtonGroupSize) {
    this._size = value;
    this._setClass();
  }

  @Input('ntExpanded')
  set expanded(value: boolean) {
    this._expanded = value === false ? false : true;
    this._setClass();
  }

  private _setClass() {
    this._class = this._class.slice(0, 1);
    this._color && this._class.push(this._color);
    this._size && this._class.push(this._size);
    this._expanded && this._class.push('expanded');
  }
}
