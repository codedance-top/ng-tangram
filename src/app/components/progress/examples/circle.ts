import { Component, AfterContentInit } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'example-progress-circle',
  template: `
    <nt-progress-circle [value]="value"></nt-progress-circle>
    <nt-progress-circle [value]="value" color="secondary"></nt-progress-circle>
    <nt-progress-circle [value]="100" color="success"><img src="/assets/right.png" /></nt-progress-circle>
    <nt-progress-circle [value]="value" color="alert">80%</nt-progress-circle>
    <nt-progress-circle [value]="value" color="warning" radius="50"></nt-progress-circle>
  `
})
export class ExampleProgressCircleComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => this.value = 80);
  }
}
