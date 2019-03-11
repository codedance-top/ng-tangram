import { Component, Input, ViewEncapsulation, Attribute } from '@angular/core';

@Component({
  selector: 'nt-avatar',
  template: '<img [src]="src" [alt]="alt">',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["nt-avatar", size, shape, class].join(" ")',
    '[class.nt-avatar-circle]': 'shape == "circle"',
  }
})
export class NtAvatarComponent {

  /**
   * 定义此属性是为了避免内部的动态样式 class 和外部设置的值起冲突，所以用此属性接收外部的值并且合并 class 来避免这个问题。
   *
   * TODO: 官方会在 Ivy Renderer 中修复这个问题，预计会在 Angular 9.0。
   * 有关此问题的Issue: https://github.com/angular/angular/issues/7289
   * @deprecated > 0.6.0
   */
  @Input() class: string = '';

  @Input() size: string = '';

  private _shape: string = 'square';

  @Input()
  get shape() { return this._shape; }
  set shape(value: any) {
    value === 'circle' && (this._shape = value);
  }

  @Input() src: string = '';

  @Input() alt: string = '';
}
