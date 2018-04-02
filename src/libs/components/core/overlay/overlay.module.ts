
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { NtOverlayComponent } from './overlay.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [NtOverlayComponent],
  declarations: [NtOverlayComponent],
})
export class NtOverlayModule { }
