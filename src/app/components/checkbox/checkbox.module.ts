import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtCheckboxModule } from '@ng-tangram/components/checkbox';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtExampleModule } from '@ng-tangram/example';

import { CheckboxDocumentComponent } from './checkbox.component';
import { ExampleCheckboxAllComponent } from './examples/all';
import { ExampleCheckboxBasicComponent } from './examples/basic';
import { ExampleCheckboxChangeComponent } from './examples/change';
import { ExampleCheckboxDisabledComponent } from './examples/disabled';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NtFormsModule,
    NtExampleModule,
    NtCheckboxModule,
    RouterModule.forChild([
      { path: '', component: CheckboxDocumentComponent }
    ])
  ],
  declarations: [
    CheckboxDocumentComponent,
    ExampleCheckboxBasicComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxAllComponent,
    ExampleCheckboxChangeComponent
  ]
})
export class CheckboxDocumentModule { }
