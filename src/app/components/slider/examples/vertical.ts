import { Component } from '@angular/core';

@Component({
  selector: 'example-slider-vertical',
  template: `
    <nt-slider vertical></nt-slider>
    <nt-slider vertical invert></nt-slider>
    <nt-slider vertical step="10"></nt-slider>
    <nt-slider vertical step="20" stepmark></nt-slider>
    <nt-slider vertical invert step="20" stepmark></nt-slider>
  `
})
export class ExampleSliderVerticalComponent { }
