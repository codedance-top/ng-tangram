import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/overlay';

import { NtTooltipComponent } from './tooltip.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule],
  exports: [NtTooltipComponent],
  declarations: [NtTooltipComponent]
})
export class NtTooltipModule { }
