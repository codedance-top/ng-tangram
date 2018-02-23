
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtOverlayModule } from '../overlay';
import { NtSelectComponent } from './select.component';
import { NtDropdownModule } from '../dropdown';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtDropdownModule],
  exports: [NtSelectComponent],
  declarations: [NtSelectComponent]
})
export class NtSelectModule { }
