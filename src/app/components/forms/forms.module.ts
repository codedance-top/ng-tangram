import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtSelectModule } from '@ng-tangram/components/select';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NtExampleModule } from '@ng-tangram/example';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtFormsModule } from '@ng-tangram/components/forms/forms.module';

import { FormsDocumentComponent } from './forms.component';

import { DemoFormLoginComponent } from './demos/login';
import { DemoFormInlineComponent } from './demos/inline';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtInputModule } from '@ng-tangram/components/input';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtFormsModule,
    NtCalloutModule,
    NtInputModule,
    NtSelectModule,
    NtDatePickerModule,
    NtIconModule,
    RouterModule.forChild([
      { path: '', component: FormsDocumentComponent }
    ])
  ],
  declarations: [FormsDocumentComponent, DemoFormLoginComponent, DemoFormInlineComponent]
})
export class FormsDocumentModule { }
