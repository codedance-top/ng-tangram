
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { AvatarDocumentComponent } from './avatar.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: AvatarDocumentComponent }
    ])],
  exports: [AvatarDocumentComponent],
  declarations: [AvatarDocumentComponent],
})
export class AvatarDocumentModule { }
