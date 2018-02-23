
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtScrimModule } from '@ng-tangram/components/scrim';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { ScrimDocumentComponent } from './scrim.component';

import { DemoScrimBasciComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtScrimModule,
    NtPaginationModule,
    RouterModule.forChild([
      { path: '', component: ScrimDocumentComponent }
    ])],
  exports: [ScrimDocumentComponent],
  declarations: [ScrimDocumentComponent, DemoScrimBasciComponent],
})
export class ScrimDocumentModule { }
