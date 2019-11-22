import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtFileModule } from '@ng-tangram/components/core';
import { NtModalModule } from '@ng-tangram/components/modal';
import { NtProgressModule } from '@ng-tangram/components/progress';

import { NtPictureComponent } from './picture.component';

@NgModule({
  imports: [
    CommonModule,
    NtFileModule,
    NtModalModule,
    NtProgressModule
  ],
  exports: [
    NtFileModule,
    NtPictureComponent
  ],
  declarations: [NtPictureComponent]
})
export class NtPictureModule { }
