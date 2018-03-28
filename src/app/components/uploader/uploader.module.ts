
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { UploaderDocumentComponent } from './uploader.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: UploaderDocumentComponent }
    ])],
  exports: [UploaderDocumentComponent],
  declarations: [UploaderDocumentComponent],
})
export class UploaderDocumentModule { }
