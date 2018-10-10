import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtAvatarComponent } from './avatar.component';
import { NtModalModule } from '@ng-tangram/components/modal';

@NgModule({
  imports: [CommonModule, NtModalModule],
  declarations: [NtAvatarComponent],
  exports: [NtAvatarComponent]
})
export class NtAvatarModule { }
