import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/overlay';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';

import { NtPopoverPaneComponent } from './popover-pane.component';
import { NtPopoverComponent } from './popover.component';

@NgModule({
  imports: [CommonModule, ObserversModule, NtOverlayModule,  NtDropdownModule],
  exports: [NtPopoverComponent, NtPopoverPaneComponent],
  declarations: [NtPopoverComponent, NtPopoverPaneComponent]
})
export class NtPopoverModule { }
