
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { PaginationDocumentComponent } from './pagination.component';
import { ExamplePaginationBasicComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPaginationModule,
    RouterModule.forChild([
      { path: '', component: PaginationDocumentComponent }
    ])
  ],
  exports: [PaginationDocumentComponent],
  declarations: [PaginationDocumentComponent, ExamplePaginationBasicComponent],
})
export class PaginationDocumentModule { }
