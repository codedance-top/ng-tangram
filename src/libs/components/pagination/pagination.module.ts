import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NT_PAGINATION_CONFIG, NtPaginationConfig } from './pagination-config';
import { NtPaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtPaginationComponent],
  declarations: [NtPaginationComponent]
})
export class NtPaginationModule {

  public static withConfig(config?: NtPaginationConfig): ModuleWithProviders {
    return {
      ngModule: NtPaginationModule,
      providers: [
        { provide: NT_PAGINATION_CONFIG, useValue: config || new NtPaginationConfig() }
      ]
    };
  }
}
