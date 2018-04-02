import { Component, ElementRef, Host, Input, Renderer2, ViewEncapsulation } from '@angular/core';

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
