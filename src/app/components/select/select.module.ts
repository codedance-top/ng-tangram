
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon';
import { NtSelectModule } from '@ng-tangram/components/select';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { SelectDocumentComponent } from './select.component';
import { DemoSelectBasciComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtFormsModule,
    NtExampleModule,
    NtAntIconModule,
    NtSelectModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: SelectDocumentComponent }
    ])],
  exports: [SelectDocumentComponent],
  declarations: [SelectDocumentComponent, DemoSelectBasciComponent],
})
export class SelectDocumentModule { }
