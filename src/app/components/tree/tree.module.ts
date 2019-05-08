import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtTreeModule } from '@ng-tangram/components/tree';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleTreeAsyncComponent } from './examples/async.component';
import { ExampleTreeCheckboxComponent } from './examples/checkbox.component';
import { ExampleTreeFlatComponent } from './examples/flat.component';
import { ExampleTreeNestedComponent } from './examples/nested.component';
import { ExampleTreeTableComponent } from './examples/table.component';
import { TreeDocumentComponent } from './tree.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtTreeModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: TreeDocumentComponent }
    ])
  ],
  exports: [TreeDocumentComponent],
  declarations: [
    TreeDocumentComponent,
    ExampleTreeAsyncComponent,
    ExampleTreeCheckboxComponent,
    ExampleTreeFlatComponent,
    ExampleTreeNestedComponent,
    ExampleTreeTableComponent
  ]
})
export class TreeDocumentModule { }
