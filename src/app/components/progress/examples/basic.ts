import { AfterContentInit, Component } from '@angular/core';

@Component({
  selector: 'example-progress-basic',
  template: `
    <nt-progress [value]="value" color="primary"></nt-progress>
    <nt-progress [value]="value" color="secondary" size="tiny"></nt-progress>
    <nt-progress [value]="value" color="success" size="small"></nt-progress>
    <nt-progress [value]="value" color="alert" size="medium"></nt-progress>
    <nt-progress [value]="value" color="warning" size="large">80%</nt-progress>
  `
})
export class ExampleProgressBasciComponent implements AfterContentInit {
  value = 0;
  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => this.value = 80);
  }
}
