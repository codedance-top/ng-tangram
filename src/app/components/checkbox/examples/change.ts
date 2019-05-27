import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-change',
  styles: [
    `
      .example-events {
        margin: 10px 0;
      }
    `
  ],
  template: `
    <nt-checkbox (change)="change($event)">change</nt-checkbox>
    <div class="example-events">
      {{status}}
    </div>
  `
})
export class ExampleCheckboxChangeComponent {

  status: string = '';

  constructor() {}

  change(event: any) {
    event.checked && (this.status = '当前为选中状态');
    !event.checked && (this.status = '当前为选非中状态');
  }
}
