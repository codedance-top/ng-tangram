
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtPopoverModule } from '@ng-tangram/components/popover';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { PopoverDocumentComponent } from './popover.component';

import { ExamplePopoverBasciComponent } from './examples/basic';
import { ExamplePopoverChangeComponent } from './examples/change';
import { ExamplePopoverPositionComponent } from './examples/position';

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
