import { Component, Input, ViewEncapsulation } from '@angular/core';

export declare type NtBadgeColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';

@Component({
  selector: 'nt-badge, [nt-badge]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["badge", color].join(" ")'
  }
})
export class NtBadgeComponent {
  @Input() color: NtBadgeColor = '';
}
