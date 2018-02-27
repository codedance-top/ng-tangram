
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtOptionModule, NtOverlayModule, NtOptionComponent } from '@ng-tangram/components/_core';
import { NtSelectComponent } from './select.component';
import { NtDropdownModule } from '../dropdown';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtOptionModule, NtDropdownModule],
  exports: [NtSelectComponent, NtOptionModule],
  declarations: [NtSelectComponent]
})
export class NtSelectModule { }
