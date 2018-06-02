import { Component, AfterContentInit } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'demo-progress-circle',
  template: `
    <nt-progress-circle [value]="value"></nt-progress-circle>
    <nt-progress-circle [value]="value" color="secondary"></nt-progress-circle>
    <nt-progress-circle [value]="value" color="success"></nt-progress-circle>
    <nt-progress-circle [value]="value" color="alert"></nt-progress-circle>
    <nt-progress-circle [value]="value" color="warning"></nt-progress-circle>
  `
})
export class DemoProgressCircleComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => this.value = 80);
  }
}
