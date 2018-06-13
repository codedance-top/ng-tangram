
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtPopConfirmModule } from '@ng-tangram/components/popconfirm';
import { PopconfirmDocumentComponent } from './popconfirm.component';

import { DemoPopConfirmBasciComponent } from './demos/basic';
import { NtIconModule } from '@ng-tangram/components/icon';

@NgModule({
  imports: [
    CommonModule,
    NtIconModule,
    NtExampleModule,
    NtPopConfirmModule,
    RouterModule.forChild([
      { path: '', component: PopconfirmDocumentComponent }
    ])],
  declarations: [PopconfirmDocumentComponent, DemoPopConfirmBasciComponent],
})
export class PopconfirmDocumentModule { }
