
import { NgModule } from '@angular/core';

import { NtInputDirective } from './input.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [NtInputDirective],
  declarations: [NtInputDirective]
})
export class NtInputModule { }
