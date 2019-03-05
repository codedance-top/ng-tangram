import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtSelectModule } from '@ng-tangram/components/select';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleSelectBasciComponent } from './examples/basic';
import { SelectDocumentComponent } from './select.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtSelectModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: SelectDocumentComponent }
    ])],
  exports: [SelectDocumentComponent],
  declarations: [SelectDocumentComponent, ExampleSelectBasciComponent],
})
export class SelectDocumentModule { }
