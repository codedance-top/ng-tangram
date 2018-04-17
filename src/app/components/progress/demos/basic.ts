import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'demo-progress-basic',
  template: `
    <nt-progress [value]="value" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="secondary" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="success" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="alert" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="warning" size="tiny"></nt-progress>
  `
})
export class DemoProgressBasciComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => this.value = 80);
  }
}
