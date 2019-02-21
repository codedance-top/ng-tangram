import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-basic',
  template: `
    <a class="button" nt-popover="标题">
      删除
      <nt-popover-pane>321321321321321</nt-popover-pane>
    </a>
  `
})
export class ExamplePopoverBasciComponent {

}
