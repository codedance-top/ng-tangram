
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtPopConfirmModule } from '@ng-tangram/components/popconfirm';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExamplePopConfirmBasciComponent } from './examples/basic';
import { ExamplePopconfirmChangeComponent } from './examples/change';
import { ExamplePopConfirmPositionComponent } from './examples/position';
import { ExamplePopConfirmTextComponent } from './examples/text';
import { PopconfirmDocumentComponent } from './popconfirm.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPopConfirmModule,
    NtMarkdownModule,
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
