import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-basic',
  template: `
    <ng-template #title>标题</ng-template>
    <a class="button" [nt-tooltip]="title">
      提示
    </a>
    <nt-tooltip title="标题">
      <a class="button">提示</a>
    </nt-tooltip>
  `
})
export class ExampleTooltipBasciComponent {

}
