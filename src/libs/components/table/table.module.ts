import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NtCellDefDirective,
  NtCellDirective,
  NtColumnDirective,
  NtFooterCellDefDirective,
  NtFooterCellDirective,
  NtHeaderCellDefDirective,
  NtHeaderCellDirective
} from './cell.directive';
import { NtTableResizable } from './resizable.directive';
import {
  NtFooterRowComponent,
  NtFooterRowDefDirective,
  NtHeaderRowComponent,
  NtHeaderRowDefDirective,
  NtRowComponent,
  NtRowDefDirective
} from './row.directive';
import { NtTableComponent } from './table.component';

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
    NtTableResizable,
    ...NT_CELL_DECLARATIONS,
    ...NT_ROW_DECLARATIONS
  ],
  declarations: [
    NtTableComponent,
    NtTableResizable,
    ...NT_CELL_DECLARATIONS,
    ...NT_ROW_DECLARATIONS
  ]
})
export class NtTableModule { }
