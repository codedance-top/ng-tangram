
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleTooltipBasciComponent } from './examples/basic';
import { ExampleTooltipChangeComponent } from './examples/change';
import { ExampleTooltipPositionComponent } from './examples/position';
import { TooltipDocumentComponent } from './tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtTooltipModule,
    NtMarkdownModule,
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
