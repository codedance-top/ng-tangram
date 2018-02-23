
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { DatatableDocumentComponent } from './datatable.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: DatatableDocumentComponent }
    ])],
  exports: [DatatableDocumentComponent],
  declarations: [DatatableDocumentComponent],
})
export class DatatableDocumentModule { }
  