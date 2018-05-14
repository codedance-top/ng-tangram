import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'demo-progress-circle',
  template: `
    <nt-progress-circle [value]="10"></nt-progress-circle>
    <nt-progress-circle [value]="30" color="secondary"></nt-progress-circle>
    <nt-progress-circle [value]="50" color="success"></nt-progress-circle>
    <nt-progress-circle [value]="70" color="alert"></nt-progress-circle>
    <nt-progress-circle [value]="100" color="warning"></nt-progress-circle>

    <nt-progress-circle [value]="70"></nt-progress-circle>
    <nt-progress-circle [value]="70" size="tiny"></nt-progress-circle>
    <nt-progress-circle [value]="70" size="small"></nt-progress-circle>
    <nt-progress-circle [value]="70" size="medium"></nt-progress-circle>
    <nt-progress-circle [value]="70" size="large"></nt-progress-circle>
  `
})
export class DemoProgressCircleComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    // setTimeout(() => this.value = 80);
  }
}
