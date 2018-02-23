
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtBadgeComponent } from './badge.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NtBadgeComponent],
  exports: [NtBadgeComponent]
})
export class NtBadgeModule { }
