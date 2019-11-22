import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtFileModule } from '@ng-tangram/components/core';
import { NtProgressModule } from '@ng-tangram/components/progress';

import { NtAttachmentComponent } from './attachment.component';

@NgModule({
  imports: [
    CommonModule,
    NtFileModule,
    NtProgressModule
  ],
  exports: [
    NtFileModule,
    NtAttachmentComponent
  ],
  declarations: [
    NtAttachmentComponent
  ]
})
export class NtAttachmentModule { }
