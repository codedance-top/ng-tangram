import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NtNestedTreeNodeDirective, NtTreeNodeDefDirective, NtTreeNodeDirective
} from './node.directive';
import { NtTreeNodeOutletDirective } from './outlet.directive';
import { NtTreeNodePaddingDirective } from './padding.directive';
import { NtTreeNodeToggleDirective } from './toggle.directive';
import { NtTreeComponent } from './tree.component';

const NT_TREE_DIRECTIVES = [
  NtNestedTreeNodeDirective,
  NtTreeNodeDefDirective,
  NtTreeNodePaddingDirective,
  NtTreeNodeToggleDirective,
  NtTreeComponent,
  NtTreeNodeDirective,
  NtTreeNodeOutletDirective
];

@NgModule({
  imports: [CdkTreeModule, CommonModule],
  exports: NT_TREE_DIRECTIVES,
  declarations: NT_TREE_DIRECTIVES
})
export class NtTreeModule { }
