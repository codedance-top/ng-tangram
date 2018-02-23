import { Component, Input } from '@angular/core';

@Component({
  selector: 'nt-example-legend',
  template: `
    <div class="example-legend">
      <div class="example-legend-title" *ngIf="title">{{title}}</div>
      <div class="example-legend-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .example-legend {
      padding: 20px 20px 32px 20px;
      position: relative;
      border-top: 1px solid #ccc;
    }
    .example-legend .example-legend-title {
      position: absolute;
      top: -16px;
      padding: 5px 5px;
      background-color: #FFF;
    }
    .example-legend .example-legend-content {
      line-height: 1.8;
    }
  `]
})

export class NtExampleLegendComponent {
  @Input('ntTitle') title: string;
}
