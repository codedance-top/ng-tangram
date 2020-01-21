import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-minmax',
  template: `
    <nt-slider [formControl]="control" min="35" max="45"></nt-slider>
  `
})
export class ExampleSliderMinMaxComponent {
  control = new FormControl(38);
 }
