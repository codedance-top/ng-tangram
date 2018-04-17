import { Component } from '@angular/core';

@Component({
  selector: 'demo-tooltip-basic',
  template: `
    <a class="button" nt-tooltip="标题">
      提示
    </a>
    <nt-tooltip title="标题">
      <a class="button">提示</a>
    </nt-tooltip>
  `
})
export class DemoTooltipBasciComponent {

}
