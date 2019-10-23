
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtPopoverModule } from '@ng-tangram/components/popover';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExamplePopoverBasciComponent } from './examples/basic';
import { ExamplePopoverChangeComponent } from './examples/change';
import { ExamplePopoverPositionComponent } from './examples/position';
import { PopoverDocumentComponent } from './popover.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPopoverModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: PopoverDocumentComponent }
    ])],
  exports: [PopoverDocumentComponent],
  declarations: [
    PopoverDocumentComponent,
    ExamplePopoverBasciComponent,
    ExamplePopoverChangeComponent,
    ExamplePopoverPositionComponent
  ],
})
export class PopoverDocumentModule { }
