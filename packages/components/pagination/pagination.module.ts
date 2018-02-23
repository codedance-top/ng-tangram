
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtPaginationConfig, NT_PAGINATION_CONFIG } from './pagination-config';
import { NtPaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtPaginationComponent],
  declarations: [NtPaginationComponent],
  providers: [{
    provide: NT_PAGINATION_CONFIG, useClass: NtPaginationConfig
  }]
})
export class NtPaginationModule { }
