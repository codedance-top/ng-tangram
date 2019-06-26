import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtButtonStyle = '' | 'hollow' | 'clear';

@Component({
  selector: '[nt-button]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["button", color, style, size, class].join(" ")',
    '[class.expanded]': 'expanded'
  }
})
export class NtButtonComponent {

  private _style: NtButtonStyle = '';

  private _expanded: boolean = false;

  /**
   * 定义此属性是为了避免内部的动态样式 class 和外部设置的值起冲突，所以用此属性接收外部的值并且合并 class 来避免这个问题。
   *
   * TODO: 官方会在 Ivy Renderer 中修复这个问题，预计会在 Angular 9.0。
   * 有关此问题的Issue: https://github.com/angular/angular/issues/7289
   * @deprecated >= 0.6.0
   */
  @Input() class: string = '';

  @Input() color: string = '';

  @Input() size: string = '';

  @Input('nt-button')
  set button(value: NtButtonStyle) {
    if (this._validStyle(value)) {
      this._style = value;
    }
  }

  @Input()
  set style(value: NtButtonStyle) { this._style = value; }
  get style() { return this._style; }

  @Input()
  set expanded(value: boolean) { this._expanded = coerceBooleanProperty(value); }
  get expanded() { return this._expanded; }

  private _validStyle(value: string) {
    return ['', 'hollow', 'clear'].indexOf(value) > -1;
  }
}
