import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-stepmark',
  template: `
    <nt-slider [formControl]="control" min="35" max="45" stepmark></nt-slider>
    <nt-slider [formControl]="control" step="20" stepmark></nt-slider>
  `
})
export class ExampleSliderStepmarkComponent {
  control = new FormControl(20);
 }
