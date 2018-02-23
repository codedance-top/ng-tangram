
import { Component, Input, ContentChildren, QueryList, AfterContentInit, ViewEncapsulation } from '@angular/core';

export declare type NtMenuAlign = '' | 'center' | 'right';
export declare type NtMenuOrientation = '' | 'horizontal' | 'vertical';

@Component({
  selector: '[nt-menu]',
  template: '<ng-content></ng-content>',
  styleUrls: ['menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_class.join(" ")'
  }
})
export class NtMenuComponent implements AfterContentInit {

  _class: string[] = ['menu'];
  _align: NtMenuAlign = '';
  _simple: boolean = false;
  _expanded: boolean = false;
  _nested: boolean = false;
  _orientation: NtMenuOrientation = '';

  @ContentChildren(NtMenuComponent) _nestedMenus: QueryList<NtMenuComponent>;

  constructor() { }

  ngAfterContentInit() {
    this._nestedMenus.toArray()
      .filter(menu => menu !== this)
      .forEach(menu => menu.nested = true);
  }

  @Input('ntAlign')
  set align(value: NtMenuAlign) {
    this._align = value;
    this._setClass();
  }

  @Input('ntOrientation')
  set orientation(value: NtMenuOrientation) {
    this._orientation = value;
    this._setClass();
  }

  @Input('ntSimple')
  set simple(value: boolean) {
    this._simple = value === false ? false : true;
    this._setClass();
  }

  @Input('ntExpanded')
  set expanded(value: boolean) {
    this._expanded = value === false ? false : true;
    this._setClass();
  }

  set nested(value: boolean) {
    this._nested = value === false ? false : true;
    this._setClass();
  }

  private _setClass() {
    this._class = this._class.slice(0, 1);
    this._align && this._class.push(`align-${this._align}`);
    this._orientation && this._class.push(this._orientation);
    this._simple && this._class.push('simple');
    this._expanded && this._class.push('expanded');
    this._nested && this._class.push('nested');
  }
}
