import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOptionComponent, NtOptionModule, NtOverlayModule } from '@ng-tangram/components/core';

import { NtDropdownModule } from '../dropdown';
import { NtSelectComponent } from './select.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtOptionModule],
  exports: [NtOverlayModule, NtSelectComponent, NtOptionModule],
  declarations: [NtSelectComponent]
})
export class NtSelectModule { }
