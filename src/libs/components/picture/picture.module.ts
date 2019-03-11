import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtModalModule } from '@ng-tangram/components/modal';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtUploadModule } from '@ng-tangram/components/upload';

import { NT_PICTURE_ICONS, NtPictureIcons } from './picture-icons';
import { NtPictureComponent } from './picture.component';

const DEFAULT_PICTURE_ICONS: NtPictureIcons = {
  add: 'fa fa-plus',
  preview: 'fa fa-search',
  remove: 'fa fa-trash-alt'
};

@NgModule({
  imports: [CommonModule, NtModalModule, NtUploadModule, NtProgressModule],
  exports: [NtPictureComponent],
  declarations: [NtPictureComponent],
  providers: [
    { provide: NT_PICTURE_ICONS, useValue: DEFAULT_PICTURE_ICONS }
  ]
})
export class NtPictureModule {
  public static forRoot(icons?: NtPictureIcons): ModuleWithProviders {
    return {
      ngModule: NtPictureModule,
      providers: [
        { provide: NT_PICTURE_ICONS, useValue: icons || DEFAULT_PICTURE_ICONS }
      ]
    };
  }
}
