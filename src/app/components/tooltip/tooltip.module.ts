
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { TooltipDocumentComponent } from './tooltip.component';

import { ExampleTooltipBasciComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtTooltipModule,
    RouterModule.forChild([
      { path: '', component: TooltipDocumentComponent }
    ])],
  exports: [TooltipDocumentComponent],
  declarations: [TooltipDocumentComponent, ExampleTooltipBasciComponent],
})
export class TooltipDocumentModule { }
