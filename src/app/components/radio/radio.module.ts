
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { RadioDocumentComponent } from './radio.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: RadioDocumentComponent }
    ])],
  exports: [RadioDocumentComponent],
  declarations: [RadioDocumentComponent],
})
export class RadioDocumentModule { }
  