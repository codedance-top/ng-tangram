import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtSwitchComponent } from './switch.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtSwitchComponent],
  declarations: [NtSwitchComponent]
})
export class NtSwitchModule { }
