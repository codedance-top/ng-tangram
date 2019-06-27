import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtProgressModule } from '@ng-tangram/components/progress';

import { DEFAULT_FILE_ICONS, NT_FILE_ICONS, NtFileIcons } from './file-icons';
import { NtFileSizePipe } from './file-size.pipe';
import { NtFileComponent } from './file.component';

@NgModule({
  imports: [CommonModule, NtProgressModule],
  exports: [NtFileComponent, NtFileSizePipe],
  declarations: [NtFileComponent, NtFileSizePipe],
  providers: [
    { provide: NT_FILE_ICONS, useValue: DEFAULT_FILE_ICONS }
  ]
})
export class NtFileModule {
  public static forRoot(icons: NtFileIcons = DEFAULT_FILE_ICONS): ModuleWithProviders {
    return {
      ngModule: NtFileModule,
      providers: [
        { provide: NT_FILE_ICONS, useValue: icons }
      ]
    };
  }
 }
