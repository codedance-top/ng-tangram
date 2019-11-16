
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtTableModule } from '@ng-tangram/components/table';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleScrimBasciComponent } from './examples/basic';
import { ScrimDocumentComponent } from './scrim.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtScrimModule,
    NtTableModule,
    NtPaginationModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: ScrimDocumentComponent }
    ])],
  exports: [ScrimDocumentComponent],
  declarations: [ScrimDocumentComponent, ExampleScrimBasciComponent],
})
export class ScrimDocumentModule { }
