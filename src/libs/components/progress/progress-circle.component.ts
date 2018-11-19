
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'nt-progress-circle',
  templateUrl: 'progress-circle.component.html',
  host: {
    '[class]': '["nt-progress-circle", color, size, class].join(" ")'
  }
})
export class NtProgressCircleComponent {

  private _max = 100;

  private _value = 0;

  private _radius = 60;

  get dasharray() {
    return this.radius * 2 * Math.PI;
  }

  get width() { return this.radius * 2 + 20; }
  get height() { return this.radius * 2 + 20; }

  @Input()
  set radius(value: number) { this._radius = coerceNumberProperty(value, 100); }
  get radius() { return this._radius; }

  @Input()
  set max(value: number) { this._max = coerceNumberProperty(value, 100); }
  get max() { return this._max; }

  @Input()
  set value(value: number) { this._value = coerceNumberProperty(value); }
  get value() { return this._value; }

  @Input() size: string = 'medium';

  @Input() color: string = '';

  @Input() class: string = '';

  get percent() {
    const percent = this.value / this.max * 100;
    return percent > 100 ? 100 : percent;
  }
}
