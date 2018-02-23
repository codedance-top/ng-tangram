import { Component } from '@angular/core';

@Component({
  selector: 'nt-example-showcase',
  template: `
    <div class="example-showcase">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .example-showcase {
      padding: 20px 20px 30px 20px;
    }
  `]
})
export class NtExampleShowcaseComponent { }
