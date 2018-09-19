import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-example',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nt-example-section'
  },
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .nt-example-section {
      border: 1px solid #ccc;
      display: block;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 1.875rem;
    }
  `]
})

export class NtExampleComponent { }
