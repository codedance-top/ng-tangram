
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-label, [nt-label]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["label", color, class].join(" ")'
  }
})
export class NtLabelComponent {

  @Input() color: string = '';

  @Input() class: string = '';
}
