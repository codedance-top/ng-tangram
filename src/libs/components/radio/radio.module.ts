
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtRadioComponent } from './radio.component';
import { NtRadioGroupComponent } from './radio-group.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtRadioComponent, NtRadioGroupComponent],
  declarations: [NtRadioComponent, NtRadioGroupComponent],
})
export class NtRadioModule { }
