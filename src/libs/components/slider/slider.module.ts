import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/overlay';

import { NtSliderInputDirective } from './slider-input.directive';
import { NtSliderRangeComponent } from './slider-range.component';
import { NtSliderComponent } from './slider.component';

@NgModule({
  imports: [
    CommonModule,
    A11yModule,
    NtOverlayModule,
  ],
  exports: [
    NtSliderComponent,
    NtSliderRangeComponent,
    NtSliderInputDirective
  ],
  declarations: [
    NtSliderComponent,
    NtSliderRangeComponent,
    NtSliderInputDirective
  ]
})
export class NtSliderModule { }
