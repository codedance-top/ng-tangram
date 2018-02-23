
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { TooltipDocumentComponent } from './tooltip.component';

import { DemoTooltipBasciComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtTooltipModule,
    RouterModule.forChild([
      { path: '', component: TooltipDocumentComponent }
    ])],
  exports: [TooltipDocumentComponent],
  declarations: [TooltipDocumentComponent, DemoTooltipBasciComponent],
})
export class TooltipDocumentModule { }
