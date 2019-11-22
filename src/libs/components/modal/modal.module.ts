import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtModalBodyComponent } from './modal-body.component';
import { NtModalFooterComponent } from './modal-footer.component';
import { NtModalHeaderComponent } from './modal-header.component';
import { NtModalComponent } from './modal.component';
import { NtModal } from './modal.service';

const EXPORTS_DECLARATIONS = [
  NtModalComponent,
  NtModalHeaderComponent,
  NtModalBodyComponent,
  NtModalFooterComponent
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  declarations: EXPORTS_DECLARATIONS,
  exports: EXPORTS_DECLARATIONS,
  entryComponents: [NtModalComponent],
  providers: [NtModal]
})
export class NtModalModule { }
