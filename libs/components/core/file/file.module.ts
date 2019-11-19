import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtFileSelectDirective } from './file-select.directive';
import { NtFileSizePipe } from './file-size.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [
    NtFileSizePipe,
    NtFileSelectDirective
  ],
  declarations: [
    NtFileSizePipe,
    NtFileSelectDirective
  ]
})
export class NtFileModule { }
