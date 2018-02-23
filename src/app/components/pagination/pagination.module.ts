
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { PaginationDocumentComponent } from './pagination.component';
import { DemoPaginationBasicComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPaginationModule,
    RouterModule.forChild([
      { path: '', component: PaginationDocumentComponent }
    ])],
  exports: [PaginationDocumentComponent],
  declarations: [PaginationDocumentComponent, DemoPaginationBasicComponent],
})
export class PaginationDocumentModule { }
