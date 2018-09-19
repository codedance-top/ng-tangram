
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export declare type NtProgressSize = 'tiny' | 'small' | 'medium' | 'large';
export declare type NtProgressColor = '' | 'primary' | 'medium' | 'large';

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

  @Input() size: NtProgressSize = 'medium';

  @Input() color: NtProgressColor = '';

  @Input() class: string = '';

  get percent() {
    const percent = this.value / this.max * 100;
    return percent > 100 ? 100 : percent;
  }
}
