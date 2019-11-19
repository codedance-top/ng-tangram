import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-example',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nt-example'
  },
  encapsulation: ViewEncapsulation.None
})

export class NtExampleComponent { }
