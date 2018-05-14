import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtExampleModule } from '@ng-tangram/example';

import { DemoProgressBasciComponent } from './demos/basic';
import { ProgressDocumentComponent } from './progress.component';
import { DemoProgressCircleComponent } from './demos/circle';


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
    DemoProgressBasciComponent,
    DemoProgressCircleComponent
  ],
})
export class ProgressDocumentModule { }
