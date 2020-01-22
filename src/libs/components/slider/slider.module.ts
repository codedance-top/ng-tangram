import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/core';

import { NtSliderComponent } from './slider.component';

@NgModule({
  imports: [
    CommonModule,
    A11yModule,
    NtOverlayModule,
  ],
  exports: [NtSliderComponent],
  declarations: [NtSliderComponent]
})
export class NtSliderModule { }
