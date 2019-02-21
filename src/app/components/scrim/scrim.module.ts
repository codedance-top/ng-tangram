
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { ScrimDocumentComponent } from './scrim.component';

import { ExampleScrimBasciComponent } from './examples/basic';
import { NtTableModule } from '@ng-tangram/components/table';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtScrimModule,
    NtTableModule,
    NtPaginationModule,
    RouterModule.forChild([
      { path: '', component: ScrimDocumentComponent }
    ])],
  exports: [ScrimDocumentComponent],
  declarations: [ScrimDocumentComponent, ExampleScrimBasciComponent],
})
export class ScrimDocumentModule { }
