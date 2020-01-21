import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-step',
  template: `
    <nt-slider [formControl]="control" step="5"></nt-slider>
    <nt-slider [formControl]="control" step="20"></nt-slider>
  `
})
export class ExampleSliderStepComponent {
  control = new FormControl(20);
 }
