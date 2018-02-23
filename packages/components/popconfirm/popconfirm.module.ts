
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtOverlayModule } from '../overlay';

import { NtPopConfirmComponent } from './popconfirm.component';
import { NtAntIconModule } from '../ant-icon';
import { NtButtonModule } from '../button';
import { NtDropdownModule } from '../dropdown';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtAntIconModule, NtButtonModule, NtDropdownModule],
  exports: [NtPopConfirmComponent],
  declarations: [NtPopConfirmComponent]
})
export class NtPopConfirmModule { }
