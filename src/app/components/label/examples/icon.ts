import { Component } from '@angular/core';

@Component({
  selector: 'example-label-icon',
  styles: [
    `
      nt-label {
        margin-right: 5px;
      }
    `
  ],
  template: `
    <nt-label><i class="fa fa-book"></i>书</nt-label>
    <nt-label><i class="fa fa-camera"></i>相机</nt-label>
  `
})
export class ExampleLabelIconComponent { }
