import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NtCellDirective, NtFooterCellDirective, NtHeaderCellDirective, NtCellDefDirective,
  NtColumnDirective, NtFooterCellDefDirective, NtHeaderCellDefDirective
} from './cell.directive';
import {
  NtFooterRowComponent, NtFooterRowDefDirective, NtHeaderRowComponent, NtHeaderRowDefDirective,
  NtRowComponent, NtRowDefDirective
} from './row.directive';
import { NtTableComponent } from './table.component';
import { CdkTableModule } from '@angular/cdk/table';

const NT_CELL_DECLARATIONS = [
  NtCellDefDirective,
  NtHeaderCellDefDirective,
  NtFooterCellDefDirective,
  NtColumnDirective,
  NtHeaderCellDirective,
  NtFooterCellDirective,
  NtCellDirective
];

const NT_ROW_DECLARATIONS = [
  NtHeaderRowDefDirective,
  NtFooterRowDefDirective,
  NtRowDefDirective,
  NtHeaderRowComponent,
  NtFooterRowComponent,
  NtRowComponent
];

@NgModule({
  imports: [CommonModule, CdkTableModule],
  exports: [
    NtTableComponent,
    ...NT_CELL_DECLARATIONS,
    ...NT_ROW_DECLARATIONS
  ],
  declarations: [
    NtTableComponent,
    ...NT_CELL_DECLARATIONS,
    ...NT_ROW_DECLARATIONS
  ]
})
export class NtTableModule { }
