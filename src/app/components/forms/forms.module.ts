import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtSelectModule } from '@ng-tangram/components/select';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NtExampleModule } from '@ng-tangram/example';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtFormsModule } from '@ng-tangram/components/forms';

import { FormsDocumentComponent } from './forms.component';

import { ExampleFormLoginComponent } from './examples/login';
import { ExampleFormInlineComponent } from './examples/inline';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtInputModule } from '@ng-tangram/components/input';

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
    NtIconModule,
    RouterModule.forChild([
      { path: '', component: FormsDocumentComponent }
    ])
  ],
  declarations: [FormsDocumentComponent, ExampleFormLoginComponent, ExampleFormInlineComponent]
})
export class FormsDocumentModule { }
