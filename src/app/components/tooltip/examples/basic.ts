import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-basic',
  styles: [`
    .button {
      margin-left: 8px;
      margin-bottom: 8px;
    }
  `],
  template: `
    <ng-template #title>标题</ng-template>
    <a class="button" [nt-tooltip]="title"> 提示1 </a>

    <nt-tooltip title="标题">
      <a class="button">提示2</a>
    </nt-tooltip>
  `
})
export class ExampleTooltipBasciComponent {

}
