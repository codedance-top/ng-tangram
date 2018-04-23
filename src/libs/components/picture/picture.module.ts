import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtUploadModule } from '@ng-tangram/components/upload';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtPictureComponent } from './picture.component';
import {  NtDropdownModule } from '@ng-tangram/components/dropdown';

@NgModule({
  imports: [CommonModule, NtUploadModule, NtProgressModule, NtIconModule],
  exports: [NtPictureComponent],
  declarations: [NtPictureComponent],
})
export class NtPictureModule { }
