
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtPaginationModule } from '@ng-tangram/components/pagination';
import { NtExampleModule } from '@ng-tangram/example';

import { ExamplePaginationBasicComponent } from './examples/basic';
import { ExamplePaginationMoreComponent } from './examples/more';
import { PaginationDocumentComponent } from './pagination.component';

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
  declarations: [PaginationDocumentComponent, ExamplePaginationBasicComponent, ExamplePaginationMoreComponent],
})
export class PaginationDocumentModule { }
