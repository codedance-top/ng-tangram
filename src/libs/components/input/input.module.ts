
import { NgModule } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

import { NtInputDirective } from './input.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [NtInputDirective],
  declarations: [NtInputDirective],
  providers: [Platform]
})
export class NtInputModule { }
