import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtCheckboxModule } from '@ng-tangram/components/checkbox';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtTableModule } from '@ng-tangram/components/table';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleTableAlternateComponent } from './examples/alternate';
import { ExampleTableBasicComponent } from './examples/basic';
import { ExampleTableColumnVisibilityComponent } from './examples/column-visibility';
import { ExampleTableSortComponent } from './examples/sort';
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
    ExampleTableBasicComponent,
    ExampleTableAlternateComponent,
    ExampleTableSortComponent,
    ExampleTableColumnVisibilityComponent,
  ],
})
export class TableDocumentModule { }
