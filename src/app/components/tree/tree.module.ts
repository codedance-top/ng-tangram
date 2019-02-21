import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtTreeModule } from '@ng-tangram/components/tree';
import { NtExampleModule } from '@ng-tangram/example';

import { DemoTreeAsyncComponent } from './demos/async';
import { DemoTreeCheckboxComponent } from './demos/checkbox';
import { DemoTreeFlatComponent } from './demos/flat.component';
import { DemoTreeNestedComponent } from './demos/nested';
import { DemoTreeTableComponent } from './demos/table';
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
    DemoTreeAsyncComponent,
    DemoTreeCheckboxComponent,
    DemoTreeFlatComponent,
    DemoTreeNestedComponent,
    DemoTreeTableComponent
  ]
})
export class TreeDocumentModule { }
