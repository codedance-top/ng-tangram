import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-example-showcase',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-showcase'
  }
})
export class NtExampleShowcaseComponent { }
