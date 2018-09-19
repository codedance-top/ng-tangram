import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-example-legend',
  template: `
    <div class="nt-example-legend-title" *ngIf="title">{{title}}</div>
    <div class="nt-example-legend-content">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-legend'
  },
  styles: [`
    .nt-example-legend {
      padding: 20px 20px 32px 20px;
      position: relative;
      border-top: 1px solid #ccc;
      display: block;
    }
    .nt-example-legend .nt-example-legend-title {
      position: absolute;
      top: -16px;
      padding: 5px 5px;
      background-color: #FFF;
    }
    .nt-example-legend .nt-example-legend-content {
      line-height: 1.8;
    }
  `]
})

export class NtExampleLegendComponent {
  @Input() title: string;
}
