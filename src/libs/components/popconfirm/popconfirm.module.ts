import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/core/overlay';

import { NtIconModule } from '../icon';
import { NtButtonModule } from '../button';
import { NtDropdownModule } from '../dropdown';
import { NtPopConfirmComponent } from './popconfirm.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtIconModule, NtButtonModule, NtDropdownModule],
  exports: [NtPopConfirmComponent],
  declarations: [NtPopConfirmComponent]
})
export class NtPopConfirmModule { }
