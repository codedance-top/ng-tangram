
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtOverlayModule } from '../overlay';

import { NtPopoverComponent } from './popover.component';
import { NtPopoverPaneComponent } from './popover-pane.component';
import { NtDropdownModule } from '../dropdown';

@NgModule({
  imports: [CommonModule, NtOverlayModule,  NtDropdownModule],
  exports: [NtPopoverComponent, NtPopoverPaneComponent],
  declarations: [NtPopoverComponent, NtPopoverPaneComponent]
})
export class NtPopoverModule { }
