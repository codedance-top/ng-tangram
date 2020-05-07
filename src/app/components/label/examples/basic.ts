import { Component } from '@angular/core';

@Component({
  selector: 'example-label-basic',
  styles: [
    `
      nt-label {
        margin-right: 5px;
      }
    `
  ],
  template: `
    <nt-label>1</nt-label>
    <span nt-label>2</span>
  `
})
export class ExampleLabelBasicComponent { }
