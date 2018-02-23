
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtSelectModule } from '@ng-tangram/components/select';
import { SelectDocumentComponent } from './select.component';

import { DemoSelectBasciComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NtExampleModule,
    NtSelectModule,
    RouterModule.forChild([
      { path: '', component: SelectDocumentComponent }
    ])],
  exports: [SelectDocumentComponent],
  declarations: [SelectDocumentComponent, DemoSelectBasciComponent],
})
export class SelectDocumentModule { }
