import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOptionModule, NtOverlayModule } from '@ng-tangram/components/core';
import { NtSelectComponent } from './select.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtOptionModule],
  exports: [NtSelectComponent, NtOptionModule],
  declarations: [NtSelectComponent]
})
export class NtSelectModule { }
