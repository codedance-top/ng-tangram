import { Component } from '@angular/core';

@Component({
  selector: 'example-slider-step',
  template: `
    <nt-slider step="5"></nt-slider>
    <nt-slider value="20" step="20"></nt-slider>
  `
})
export class ExampleSliderStepComponent { }
