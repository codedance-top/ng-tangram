import { Component, Input, Output, HostListener, EventEmitter, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

export declare type NtButtonType = '' | 'hollow' | 'clear';
export declare type NtButtonColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtButtonSize =  '' | 'tiny' | 'small' | 'large' | 'medium';

@Component({
  selector: '[nt-button]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_class.join(" ")'
  }
})
export class NtButtonComponent {

  _class: string[] = ['button'];
  _color: NtButtonColor = '';
  _size: NtButtonSize = '';
  _type: NtButtonType = '';
  _expanded: boolean = false;
  _disabled: boolean = false;

  @Input('ntColor')
  set color(value: NtButtonColor) {
    this._color = value;
    this._setClass();
  }

  @Input('ntSize')
  set size(value: NtButtonSize) {
    this._size = value;
    this._setClass();
  }

  @Input('ntType')
  set type(value: NtButtonType) {
    this._type = value;
    this._setClass();
  }

  @Input('ntExpanded')
  set expanded(value: boolean) {
    this._expanded = value === false ? false : true;
    this._setClass();
  }

  @Input('ntDisabled')
  set disabled(value: boolean) {
    this._disabled = value === false ? false : true;
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', this._disabled);
  }

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
  }

  private _setClass() {
    this._class = this._class.slice(0, 1);
    this._color && this._class.push(this._color);
    this._type && this._class.push(this._type);
    this._size && this._class.push(this._size);
    this._expanded && this._class.push('expanded');
  }
}
