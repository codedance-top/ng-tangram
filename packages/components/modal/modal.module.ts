import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { NtButtonModule } from '../button/button.module';
import { NtModalContainer } from './modal-container';
import { NtModal } from './modal';

@NgModule({
  imports: [CommonModule, RouterModule, PortalModule, OverlayModule, NtButtonModule],
  entryComponents: [NtModalContainer],
  declarations: [NtModalContainer],
  providers: [NtModal]
})
export class NtModalModule { }
