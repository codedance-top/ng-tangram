
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'nt-progress',
  templateUrl: 'progress.component.html',
  host: {
    '[class]': '["progress", color, size, class].join(" ")'
  }
})
export class NtProgressComponent {

  private _max = 100;

  private _value = 0;

  @Input()
  set max(value: number) { this._max = coerceNumberProperty(value, 100); }
  get max() { return this._max; }

  @Input()
  set value(value: number) { this._value = coerceNumberProperty(value); }
  get value() { return this._value; }

  @Input() size: string = 'medium';

  @Input() color: string = '';

  /**
   * 定义此属性是为了避免内部的动态样式 class 和外部设置的值起冲突，所以用此属性接收外部的值并且合并 class 来避免这个问题。
   *
   * TODO: 官方会在 Ivy Renderer 中修复这个问题，预计会在 Angular 9.0。
   * 有关此问题的Issue: https://github.com/angular/angular/issues/7289
   * @deprecated > 0.6.0
   */
  @Input() class: string = '';

  get percent() {
    const percent = this.value / this.max * 100;
    return percent > 100 ? 100 : percent;
  }
}
