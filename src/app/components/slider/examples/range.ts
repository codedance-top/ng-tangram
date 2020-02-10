import { Component } from '@angular/core';

@Component({
  selector: 'example-slider-range',
  template: `
    <nt-slider (input)="inputValue = $event.value"></nt-slider>
  `
})
export class ExampleSliderRangeComponent {
  inputValue: number = 5;
 }
