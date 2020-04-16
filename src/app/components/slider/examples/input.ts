import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NtSliderChange } from '@ng-tangram/components/slider';

@Component({
  selector: 'example-slider-input',
  template: `
    <nt-slider [(ngModel)]="model" (change)="onChange('mode 1', $event)"></nt-slider>
    <input type="number" [(ngModel)]="model">

    <nt-slider #slider1 [value]="value" (change)="onChange('mode 2', $event)"></nt-slider>
    <input type="number" [ntSliderInput]="slider1">

    <nt-slider #slider2 [formControl]="control" (change)="onChange('mode 3', $event)"></nt-slider>
    <input type="number" [ntSliderInput]="slider2">
  `
})
export class ExampleSliderInputComponent {

  model = 15;

  value = 15;

  control = new FormControl(15);

  onChange(mode: string, event: NtSliderChange) {
    console.log(`${mode}:`, event);
  }
}
