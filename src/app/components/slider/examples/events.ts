import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-events',
  template: `
    <nt-slider (input)="inputValue = $event.value"></nt-slider>
  `
})
export class ExampleSliderEventsComponent {
  inputValue: number = 5;
 }
