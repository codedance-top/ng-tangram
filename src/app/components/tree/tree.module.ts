import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtTreeModule } from '@ng-tangram/components/tree';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleTreeAsyncComponent } from './examples/async';
import { ExampleTreeCheckboxComponent } from './examples/checkbox';
import { ExampleTreeFlatComponent } from './examples/flat.component';
import { ExampleTreeNestedComponent } from './examples/nested';
import { ExampleTreeTableComponent } from './examples/table';
import { TreeDocumentComponent } from './tree.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtTreeModule,
    RouterModule.forChild([
      { path: '', component: TreeDocumentComponent }
    ])],
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
