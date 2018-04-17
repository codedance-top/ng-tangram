
import { Component, Input } from '@angular/core';

export declare type NtProgressSize = 'tiny' | 'small' | 'medium' | 'large';

export declare type NtProgressColor = '' | 'primary' | 'medium' | 'large';

@Component({
  selector: 'nt-progress',
  template: `
    <span class="progress-meter" [style.width.%]="percent">
      <p class="progress-meter-text"><ng-content></ng-content></p>
    </span>
  `,
  host: {
    '[class]': '["progress", color, size, class].join(" ")'
  }
})
export class NtProgressComponent {

  @Input() max: number = 100;

  @Input() value: number = 0;

  @Input() size: NtProgressSize = 'medium';

  @Input() color: NtProgressColor = '';

  @Input() class: string = '';

  get percent() { return this.value / this.max * 100; }
}
