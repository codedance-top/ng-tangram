import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtOptionModule, NtOverlayModule } from '@ng-tangram/components/core';

import { DEFAULT_SELECT_ICONS, NT_SELECT_ICONS, NtSelectIcons } from './select-icons';
import { NtSelectComponent } from './select.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtOptionModule],
  exports: [NtSelectComponent, NtOptionModule],
  declarations: [NtSelectComponent],
  providers: [
    { provide: NT_SELECT_ICONS, useValue: DEFAULT_SELECT_ICONS }
  ]
})
export class NtSelectModule {
  public static forRoot(icons?: NtSelectIcons): ModuleWithProviders {
    return {
      ngModule: NtSelectModule,
      providers: [
        { provide: NT_SELECT_ICONS, useValue: icons || DEFAULT_SELECT_ICONS }
      ]
    };
  }
}
