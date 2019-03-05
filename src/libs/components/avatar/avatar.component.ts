import { Component, Input, ViewEncapsulation, Attribute } from '@angular/core';

@Component({
  selector: 'nt-avatar',
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-avatar',
    '[class.small]': 'size === "small"',
    '[class.medium]': 'size === "medium"',
    '[class.large]': 'size === "large"',
    '[class.nt-avatar-circle]': 'shape == "circle"',
  }
})
export class NtAvatarComponent {

  private _styleMap = [
    'large',
    'medium',
    'small',
  ];

  private _style: string = 'medium';

  constructor(@Attribute('alt') public alt: string ) { }

  @Input()
  get size() { return this._style; }
  set size(value: any) {
    if (this._styleMap.indexOf(value) !== -1) {
      this._style = value;
    }
  }

  private _shape: string = 'square';

  @Input()
  get shape() { return this._shape; }
  set shape(value: any) {
    value === 'circle' && (this._shape = value);
  }

  @Input() src: string = '';

}
