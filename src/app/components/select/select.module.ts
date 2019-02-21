
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtSelectModule } from '@ng-tangram/components/select';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { SelectDocumentComponent } from './select.component';
import { ExampleSelectBasciComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtIconModule,
    NtSelectModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: SelectDocumentComponent }
    ])],
  exports: [SelectDocumentComponent],
  declarations: [SelectDocumentComponent, ExampleSelectBasciComponent],
})
export class SelectDocumentModule { }
