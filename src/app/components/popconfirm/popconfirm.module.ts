
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { NtPopConfirmModule } from '@ng-tangram/components/popconfirm';
import { PopconfirmDocumentComponent } from './popconfirm.component';

import { ExamplePopConfirmBasciComponent } from './examples/basic';
import { ExamplePopConfirmTextComponent } from './examples/text';
import { ExamplePopConfirmPositionComponent } from './examples/position';
import { ExamplePopconfirmChangeComponent } from './examples/change';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPopConfirmModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: PopconfirmDocumentComponent }
    ])],
  declarations: [
    PopconfirmDocumentComponent,
    ExamplePopConfirmBasciComponent,
    ExamplePopConfirmTextComponent,
    ExamplePopConfirmPositionComponent,
    ExamplePopconfirmChangeComponent
  ],
})
export class PopconfirmDocumentModule { }
