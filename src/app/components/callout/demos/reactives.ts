import { Component } from '@angular/core';

@Component({
  selector: 'demo-callout-reactives',
  template: `
    <nt-callout [ntColor]="color">
      动态改变颜色提示
    </nt-callout>
    <select #select (change)="color = select.value">
      <option value="primary">primary</option>
      <option value="secondary">secondary</option>
      <option value="success">success</option>
      <option value="warning">warning</option>
      <option value="alert">alert</option>
    </select>
  `
})
export class DemoCalloutReactivesComponent {
  color = 'primary';
}
