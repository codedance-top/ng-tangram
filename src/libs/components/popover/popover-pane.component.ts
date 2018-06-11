import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-popover-pane, [nt-popover-pane]',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NtPopoverPaneComponent {

  constructor() { }
}
