
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtTableModule } from '@ng-tangram/components/table';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleScrimBasciComponent } from './examples/basic';
import { ScrimDocumentComponent } from './scrim.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtScrimModule,
    NtTableModule,
    NtPaginationModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: ScrimDocumentComponent }
    ])],
  exports: [ScrimDocumentComponent],
  declarations: [ScrimDocumentComponent, ExampleScrimBasciComponent],
})
export class ScrimDocumentModule { }
