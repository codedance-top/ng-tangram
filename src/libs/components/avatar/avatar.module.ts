import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtAvatarComponent } from './avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NtAvatarComponent],
  exports: [NtAvatarComponent]
})
export class NtAvatarModule { }
