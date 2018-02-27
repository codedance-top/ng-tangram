
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtOverlayModule } from '@ng-tangram/components/_core/overlay';

import { NtTooltipComponent } from './tooltip.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule],
  exports: [NtTooltipComponent],
  declarations: [NtTooltipComponent]
})
export class NtTooltipModule { }
