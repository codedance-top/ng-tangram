
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtRadioGroupComponent } from './radio-group.component';
import { NtRadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtRadioComponent, NtRadioGroupComponent],
  declarations: [NtRadioComponent, NtRadioGroupComponent],
})
export class NtRadioModule { }
