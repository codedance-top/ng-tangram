import { Component, AfterContentInit } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'example-progress-circle',
  styles: [`
      i {
        color: #53c41a;
        font-size: 30px;
      }
    `
  ],
  template: `
    <nt-progress-circle [value]="value"></nt-progress-circle>
    <nt-progress-circle [value]="value" color="secondary"></nt-progress-circle>
    <nt-progress-circle [value]="100" color="success"><i class="fas fa-check"></i></nt-progress-circle>
    <nt-progress-circle [value]="value" color="alert"><span>80%</span></nt-progress-circle>
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
