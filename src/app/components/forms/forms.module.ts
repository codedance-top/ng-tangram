import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtInputModule } from '@ng-tangram/components/input';
import { NtSelectModule } from '@ng-tangram/components/select';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleFormInlineComponent } from './examples/inline';
import { ExampleFormLoginComponent } from './examples/login';
import { FormsDocumentComponent } from './forms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtFormsModule,
    NtCalloutModule,
    NtInputModule,
    NtSelectModule,
    NtDatePickerModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: FormsDocumentComponent }
    ])
  ],
  declarations: [
    FormsDocumentComponent,
    ExampleFormLoginComponent,
    ExampleFormInlineComponent
  ]
})
export class FormsDocumentModule { }
