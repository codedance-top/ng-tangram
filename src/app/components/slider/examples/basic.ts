import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-basic',
  template: `
    <nt-slider [formControl]="control" (input)="inputValue = $event.value" step="20" stepmark></nt-slider>
    {{ inputValue }}
  `
})
export class ExampleSliderBasciComponent {
  inputValue: number = 5;
  control = new FormControl(5);
 }
