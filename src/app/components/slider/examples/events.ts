import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-events',
  template: `
    <nt-slider [formControl]="control" (input)="inputValue = $event.value"></nt-slider>
  `
})
export class ExampleSliderEventsComponent {
  inputValue: number = 5;
  control = new FormControl(5);
 }
