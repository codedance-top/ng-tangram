import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtModalModule } from '@ng-tangram/components/modal';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';
import { NtUploadModule } from '@ng-tangram/components/upload';

import { NtPictureComponent } from './picture.component';

@NgModule({
  imports: [CommonModule, NtModalModule, NtTooltipModule, NtUploadModule, NtProgressModule, NtIconModule],
  exports: [NtPictureComponent],
  declarations: [NtPictureComponent],
})
export class NtPictureModule { }
