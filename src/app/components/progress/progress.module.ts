import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleProgressBasciComponent } from './examples/basic';
import { ExampleProgressCircleComponent } from './examples/circle';
import { ProgressDocumentComponent } from './progress.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownBlockModule,
    NtProgressModule,
    RouterModule.forChild([
      { path: '', component: ProgressDocumentComponent }
    ])],
  exports: [ProgressDocumentComponent],
  declarations: [
    ProgressDocumentComponent,
    ExampleProgressBasciComponent,
    ExampleProgressCircleComponent
  ],
})
export class ProgressDocumentModule { }
