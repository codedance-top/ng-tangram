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
  }
})
export class NtExampleLegendComponent {
  @Input() title: string;
}
