
import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtLabelColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';

@Component({
  selector: 'nt-label, [nt-label]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["label", color].join(" ")'
  }
})

export class NtLabelComponent {
  @Input('ntColor') color: NtLabelColor = '';
}
