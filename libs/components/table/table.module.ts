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

const EXPORTS_DECLARATIONS = [
  NtTableComponent,
  NtTableResizable,
  NtCellDefDirective,
  NtCellDirective,
  NtColumnDirective,
  NtFooterCellDefDirective,
  NtFooterCellDirective,
  NtHeaderCellDefDirective,
  NtHeaderCellDirective,
  NtFooterRowComponent,
  NtFooterRowDefDirective,
  NtHeaderRowComponent,
  NtHeaderRowDefDirective,
  NtRowComponent,
  NtRowDefDirective
];

@NgModule({
  imports: [CommonModule, CdkTableModule],
  exports: EXPORTS_DECLARATIONS,
  declarations: EXPORTS_DECLARATIONS
})
export class NtTableModule { }
