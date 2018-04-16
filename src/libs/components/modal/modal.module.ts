import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtModal } from './modal';
import { NtModalComponent } from './modal.component';
import { NtModalHeaderComponent } from './modal-header.component';
import { NtModalBodyComponent } from './modal-body.component';
import { NtModalFooterComponent } from './modal-footer.component';

@NgModule({
  imports: [CommonModule, PortalModule, OverlayModule],
  entryComponents: [NtModalComponent],
  declarations: [NtModalComponent, NtModalHeaderComponent, NtModalBodyComponent, NtModalFooterComponent],
  providers: [NtModal],
  exports: [NtModalHeaderComponent, NtModalBodyComponent, NtModalFooterComponent]
})
export class NtModalModule { }
