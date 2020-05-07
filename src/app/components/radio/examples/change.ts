import { Component } from '@angular/core';

@Component({
  selector: 'example-radio-change',
  styles: [
    `
      .example-events {
        margin: 10px 0;
      }
    `
  ],
  template: `
    <nt-radio (change)="_change($event)">change</nt-radio>
    <div class="example-events">
      {{text}}<span *ngIf="index > 1"> * {{index}}</span>
    </div>
  `
})
export class ExampleRadioChangeComponent {

  text: string = '';

  index: number = 0;

  constructor () {}

  _change(event: any) {
    console.log(event);
    this.text = '状态改变时触发';
    this.index ++;
  }
}
