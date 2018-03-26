import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@modules/example/example.module';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtTableModule } from '@ng-tangram/components/table/table.module';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';

import { DemoTableBasicComponent } from './demos/basic';
import { DemoTableSortComponent } from './demos/sort';
import { TableDocumentComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NtExampleModule,
    NtTooltipModule,
    NtTableModule,
    NtScrimModule,
    RouterModule.forChild([
      { path: '', component: TableDocumentComponent }
    ])],
  declarations: [TableDocumentComponent, DemoTableBasicComponent, DemoTableSortComponent],
})
export class TableDocumentModule { }
