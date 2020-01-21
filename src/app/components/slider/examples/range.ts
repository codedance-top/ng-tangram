import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-range',
  template: `
    <nt-slider [formControl]="control" (input)="inputValue = $event.value"></nt-slider>
  `
})
export class ExampleSliderRangeComponent {
  inputValue: number = 5;
  control = new FormControl(5);
 }
