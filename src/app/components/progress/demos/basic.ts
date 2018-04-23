import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'demo-progress-basic',
  template: `
    <nt-progress [value]="value" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="secondary" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="success" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="alert" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="warning" size="tiny"></nt-progress>

    <nt-progress [value]="value" size="small"></nt-progress>
    <nt-progress [value]="value" color="secondary" size="small"></nt-progress>
    <nt-progress [value]="value" color="success" size="small"></nt-progress>
    <nt-progress [value]="value" color="alert" size="small"></nt-progress>
    <nt-progress [value]="value" color="warning" size="small"></nt-progress>

    <nt-progress [value]="value"></nt-progress>
    <nt-progress [value]="value" color="secondary"></nt-progress>
    <nt-progress [value]="value" color="success"></nt-progress>
    <nt-progress [value]="value" color="alert"></nt-progress>
    <nt-progress [value]="value" color="warning"></nt-progress>

    <nt-progress [value]="value" size="large"></nt-progress>
    <nt-progress [value]="value" color="secondary" size="large"></nt-progress>
    <nt-progress [value]="value" color="success" size="large"></nt-progress>
    <nt-progress [value]="value" color="alert" size="large"></nt-progress>
    <nt-progress [value]="value" color="warning" size="large"></nt-progress>
  `
})
export class DemoProgressBasciComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => this.value = 80);
  }
}
