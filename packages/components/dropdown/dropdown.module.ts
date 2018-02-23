import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtOverlayModule } from '../overlay';

import { NtDropdownComponent } from './dropdown.component';
import { NtDropdownPaneComponent } from './dropdown-pane.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule],
  entryComponents: [NtDropdownComponent],
  exports: [NtDropdownComponent, NtDropdownPaneComponent],
  declarations: [NtDropdownComponent, NtDropdownPaneComponent]
})
export class NtDropdownModule { }
