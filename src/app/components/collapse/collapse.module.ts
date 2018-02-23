
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { CollapseDocumentComponent } from './collapse.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: CollapseDocumentComponent }
    ])],
  exports: [CollapseDocumentComponent],
  declarations: [CollapseDocumentComponent],
})
export class CollapseDocumentModule { }
