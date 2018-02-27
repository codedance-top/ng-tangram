import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-ant-icon',
  template: '<i class="anticon icon-{{type}}"></i>',
  encapsulation: ViewEncapsulation.None
})
export class NtAntIconComponent {

  @Input('ntType') type: string;
}
