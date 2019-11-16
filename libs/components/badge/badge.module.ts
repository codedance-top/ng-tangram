import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtBadgeComponent } from './badge.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NtBadgeComponent],
  exports: [NtBadgeComponent]
})
export class NtBadgeModule { }
