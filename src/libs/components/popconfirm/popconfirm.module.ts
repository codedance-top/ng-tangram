import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtOverlayModule } from '@ng-tangram/components/overlay';

import { NtPopConfirmComponent } from './popconfirm.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtButtonModule],
  exports: [NtPopConfirmComponent],
  declarations: [NtPopConfirmComponent]
})
export class NtPopConfirmModule { }
