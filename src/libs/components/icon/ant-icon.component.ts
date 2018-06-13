import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * @deprecated v0.3.0
 */
@Component({
  selector: 'nt-ant-icon',
  template: '<i class="anticon icon-{{type}}"></i>',
  encapsulation: ViewEncapsulation.None
})
export class NtAntIconComponent {
  @Input() type: string;
}
