import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtUploadModule } from '@ng-tangram/components/upload';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtProgressModule } from '@ng-tangram/components/progress';
import { NtFileComponent } from './file.component';

@NgModule({
  imports: [CommonModule, NtUploadModule, NtProgressModule, NtIconModule],
  exports: [NtFileComponent],
  declarations: [NtFileComponent],
})
export class NtFileModule { }
