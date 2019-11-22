import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtInputAddonComponent } from './input-addon.component';
import { NtInputGroupComponent } from './input-group.component';
import { NtInputDirective } from './input.directive';

@NgModule({
  imports: [CommonModule],
  exports: [NtInputDirective, NtInputGroupComponent, NtInputAddonComponent],
  declarations: [NtInputDirective, NtInputGroupComponent, NtInputAddonComponent],
  providers: [Platform]
})
export class NtInputModule { }
