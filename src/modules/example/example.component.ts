import { Component, Input } from '@angular/core';

@Component({
  selector: 'nt-example',
  template: `
    <div class="example-section">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .example-section {
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 1.875rem;
    }
  `]
})

export class NtExampleComponent { }
