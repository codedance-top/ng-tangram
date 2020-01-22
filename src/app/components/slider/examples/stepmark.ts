import { Component } from '@angular/core';

@Component({
  selector: 'example-slider-stepmark',
  template: `
    <nt-slider min="35" max="45" stepmark></nt-slider>
    <nt-slider step="20" stepmark></nt-slider>
  `
})
export class ExampleSliderStepmarkComponent { }
