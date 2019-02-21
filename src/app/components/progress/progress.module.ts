import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleProgressBasciComponent } from './examples/basic';
import { ProgressDocumentComponent } from './progress.component';
import { ExampleProgressCircleComponent } from './examples/circle';


@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
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
