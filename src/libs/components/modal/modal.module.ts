import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtModal } from './modal';
import { NtModalContainer } from './modal-container';

@NgModule({
  imports: [CommonModule, PortalModule, OverlayModule],
  entryComponents: [NtModalContainer],
  declarations: [NtModalContainer],
  providers: [NtModal]
})
export class NtModalModule { }
