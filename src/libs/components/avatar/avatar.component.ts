import { Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export declare type NtAvatarShape = '' | 'circle' | 'square';

@Component({
  selector: 'nt-avatar',
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NtAvatarComponent {

  private _styleMap = {
    'large': 'nt-avatar-large',
    'medium': 'nt-avatar-medium',
    'small': 'nt-avatar-small',
  }

  private _size: number;
  private _style: string = 'nt-avatar-medium';
  private _shape: string = 'circle';

  @Input()
  get size() { return this._size; }
  set size(value: any) {
    if (coerceNumberProperty(value) > 0) {
      this._size = coerceNumberProperty(value);
    }
  }

  @Input()
  get style() { return this._style; }
  set style(value: any) {
    this._style = value in this._styleMap ? this._styleMap[value] : "nt-avatar-medium";
  }

  @Input()
  get shape() { return this._shape; }
  set shape(value: any) {
    value == 'square' && (this._shape = value);
  }

  @Input() thumbnail: string = '';

  @Input() src: string = '';

  @Input() alt: string = '';

  constructor() { }

}
