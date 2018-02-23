import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-basic',
  template: `
    <a class="button" nt-popover ntTitle="标题">
      删除
      <nt-popover-pane>321321321321321</nt-popover-pane>
    </a>
  `
})
export class DemoPopoverBasciComponent {

}
