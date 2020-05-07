import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOptionModule, NtPseudoInputModule } from '@ng-tangram/components/core';
import { NtOverlayModule } from '@ng-tangram/components/overlay';
import { NtSelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    NtOverlayModule,
    NtOptionModule,
    NtPseudoInputModule
  ],
  exports: [NtSelectComponent, NtOptionModule],
  declarations: [NtSelectComponent]
})
export class NtSelectModule { }
