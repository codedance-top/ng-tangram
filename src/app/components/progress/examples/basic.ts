import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'example-progress-basic',
  template: `
    <nt-progress [value]="value"></nt-progress>
    <nt-progress [value]="value" color="secondary"></nt-progress>
    <nt-progress [value]="value" color="success"></nt-progress>
    <nt-progress [value]="value" color="alert"></nt-progress>
    <nt-progress [value]="value" color="warning"></nt-progress>
  `
})
export class ExampleProgressBasciComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => this.value = 80);
  }
}
