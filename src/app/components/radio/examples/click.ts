import { Component } from '@angular/core';

@Component({
  selector: 'example-radio-click',
  styles: [
    `
      .example-events {
        margin: 10px 0;
      }
    `
  ],
  template: `
    <nt-radio (click)="_click($event)">click</nt-radio>
    <div class="example-events">
      {{text}}<span *ngIf="index > 1"> * {{index}}</span>
    </div>
  `
})
export class ExampleRadioClickComponent {

  text: string = '';

  index: number = 0;

  constructor() {}

  _click (event: any) {
    console.log(event);
    this.text = '点击时触发';
    this.index ++;
  }

}
