
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { TooltipDocumentComponent } from './tooltip.component';

import { ExampleTooltipBasciComponent } from './examples/basic';
import { ExampleTooltipChangeComponent } from './examples/change';
import { ExampleTooltipPositionComponent } from './examples/position';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtTooltipModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: TooltipDocumentComponent }
    ])],
  exports: [TooltipDocumentComponent],
  declarations: [
    TooltipDocumentComponent,
    ExampleTooltipBasciComponent,
    ExampleTooltipChangeComponent,
    ExampleTooltipPositionComponent
  ],
})
export class TooltipDocumentModule { }
