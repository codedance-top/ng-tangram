import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/core/overlay';

import { NtAntIconModule } from '../ant-icon';
import { NtButtonModule } from '../button';
import { NtDropdownModule } from '../dropdown';
import { NtPopConfirmComponent } from './popconfirm.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtAntIconModule, NtButtonModule, NtDropdownModule],
  exports: [NtPopConfirmComponent],
  declarations: [NtPopConfirmComponent]
})
export class NtPopConfirmModule { }
