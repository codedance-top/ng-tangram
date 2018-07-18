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

  /**
   * 此方法将会废弃，请用 NtPaginationModule.withConfig 代替
   * @deprecated 0.4.x 废弃
   */
  public static forRoot(config?: NtPaginationConfig) {
    return NtPaginationModule.withConfig(config);
  }

  public static withConfig(config?: NtPaginationConfig): ModuleWithProviders {
    return {
      ngModule: NtPaginationModule,
      providers: [
        { provide: NT_PAGINATION_CONFIG, useValue: config || new NtPaginationConfig() }
      ]
    };
  }
}
