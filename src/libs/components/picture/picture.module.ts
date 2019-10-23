import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtModalModule } from '@ng-tangram/components/modal';
import { NtProgressModule } from '@ng-tangram/components/progress';

import { NtPictureComponent } from './picture.component';

@NgModule({
  imports: [CommonModule, NtModalModule, NtProgressModule],
  exports: [NtPictureComponent],
  declarations: [NtPictureComponent]
})
export class NtPictureModule { }
