import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-slider-forms',
  template: `
    <nt-slider [formControl]="control"></nt-slider>
  `
})
export class ExampleSliderFormsComponent {
  control = new FormControl(5);
}
