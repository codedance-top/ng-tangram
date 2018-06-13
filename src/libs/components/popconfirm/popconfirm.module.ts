import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/core';

import { NtIconModule } from '@ng-tangram/components/icon';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtPopConfirmComponent } from './popconfirm.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtIconModule, NtButtonModule],
  exports: [NtPopConfirmComponent],
  declarations: [NtPopConfirmComponent]
})
export class NtPopConfirmModule { }
