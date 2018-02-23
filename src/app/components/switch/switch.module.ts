
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { SwitchDocumentComponent } from './switch.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: SwitchDocumentComponent }
    ])],
  exports: [SwitchDocumentComponent],
  declarations: [SwitchDocumentComponent],
})
export class SwitchDocumentModule { }
  