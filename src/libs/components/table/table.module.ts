import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOverlayModule } from '@ng-tangram/components/core';

import {
  NtColumnCellDefDirective, NtColumnCellDirective, NtColumnComponent,
  NtColumnHeaderDirective
} from './column.directive';
import { NtTableComponent } from './table.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    NtTableComponent,
    NtColumnComponent,
    NtColumnCellDirective,
    NtColumnHeaderDirective,
    NtColumnCellDefDirective
  ],
  declarations: [
    NtTableComponent,
    NtColumnComponent,
    NtColumnCellDirective,
    NtColumnHeaderDirective,
    NtColumnCellDefDirective
  ]
})
export class NtTableModule { }
