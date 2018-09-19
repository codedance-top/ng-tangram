import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-example-showcase',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-showcase'
  },
  styles: [`
    .nt-example-showcase {
      display: block;
      padding: 20px 20px 30px 20px;
    }
  `]
})
export class NtExampleShowcaseComponent { }
