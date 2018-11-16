import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtTreeModule } from '@ng-tangram/components/tree';
import { NtExampleModule } from '@ng-tangram/example';

import { DemoTreeBasciComponent } from './demos/basic';
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
  declarations: [TreeDocumentComponent, DemoTreeBasciComponent]
})
export class TreeDocumentModule { }
