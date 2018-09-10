import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtCheckboxModule } from '@ng-tangram/components/checkbox';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtTableModule } from '@ng-tangram/components/table/table.module';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { NtExampleModule } from '@ng-tangram/example';

import { DemoTableAlternateComponent } from './demos/alternate';
import { DemoTableBasicComponent } from './demos/basic';
import { DemoTableColumnVisibilityComponent } from './demos/column-visibility';
import { DemoTableSortComponent } from './demos/sort';
import { TableDocumentComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NtButtonModule,
    NtCheckboxModule,
    NtCalloutModule,
    NtExampleModule,
    NtTooltipModule,
    NtTableModule,
    NtScrimModule,
    RouterModule.forChild([
      { path: '', component: TableDocumentComponent }
    ])],
  declarations: [
    TableDocumentComponent,
    DemoTableBasicComponent,
    DemoTableAlternateComponent,
    DemoTableSortComponent,
    DemoTableColumnVisibilityComponent,
  ],
})
export class TableDocumentModule { }
