import { Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'nt-avatar',
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-avatar',
    '[class.nt-avatar-small]': 'size === "small"',
    '[class.nt-avatar-medium]': 'size === "medium"',
    '[class.nt-avatar-large]': 'size === "large"',
    '[class.nt-avatar-square]': 'shape == "square"',
    '[style.width]': '_size + "px"',
    '[style.height]': '_size + "px"'
  }
})
export class NtAvatarComponent {

  private _styleMap = [
    'large',
    'medium',
    'small',
  ]

  private _size: number;
  private _style: string = 'medium';
  private _shape: string = 'circle';

  @Input()
  get size() { return this._style; }
  set size(value: any) {
    if (this._styleMap.indexOf(value) !== -1) {
      this._style = value;
    } else if (coerceNumberProperty(value) > 0) {
      this._size = coerceNumberProperty(value);
    }
  }

  @Input()
  get shape() { return this._shape; }
  set shape(value: any) {
    value == 'square' && (this._shape = value);
  }

  @Input() src: string = '';

  @Input() alt: string = 'avatar';

  constructor() { }

}
