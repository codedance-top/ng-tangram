
import { Component, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { NtProgressColor, NtProgressSize } from './progress.component';

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

  @Input()
  set max(value: number) { this._max = coerceNumberProperty(value, 100); }
  get max() { return this._max; }

  @Input()
  set value(value: number) { this._value = coerceNumberProperty(value); }
  get value() { return this._value; }

  @Input() size: NtProgressSize = 'medium';

  @Input() color: NtProgressColor = '';

  @Input() class: string = '';

  get percent() {
    return this.value / this.max * 100;
  }
}
