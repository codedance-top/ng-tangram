import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtModalModule } from '@ng-tangram/components/modal';
import { NtProgressModule } from '@ng-tangram/components/progress';

import { NT_PICTURE_ICONS, NtPictureIcons } from './picture-icons';
import { NtPictureComponent } from './picture.component';



@NgModule({
  imports: [CommonModule, NtModalModule, NtProgressModule],
  exports: [NtPictureComponent],
  declarations: [NtPictureComponent]
})
export class NtPictureModule { }
