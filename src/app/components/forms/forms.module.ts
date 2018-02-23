
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NtExampleModule } from '@modules/example/example.module';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon/ant-icon.module';
import { NtFormsModule } from '@ng-tangram/components/forms/forms.module';

import { FormsDocumentComponent } from './forms.component';

import { DemoFormLoginComponent } from './demos/login';
import { DemoFormInlineComponent } from './demos/inline';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtFormsModule,
    NtAntIconModule,
    RouterModule.forChild([
      { path: '', component: FormsDocumentComponent }
    ])
  ],
  declarations: [FormsDocumentComponent, DemoFormLoginComponent, DemoFormInlineComponent]
})
export class FormsDocumentModule { }
