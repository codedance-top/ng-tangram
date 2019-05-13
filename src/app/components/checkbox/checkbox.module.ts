import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtCheckboxModule } from '@ng-tangram/components/checkbox';
import { NtExampleModule } from '@ng-tangram/example';

import { CheckboxDocumentComponent } from './checkbox.component';
import { ExampleCheckboxBasicComponent } from './examples/basic';
import { ExampleCheckboxDisabledComponent } from './examples/disabled';
import { ExampleCheckboxAllComponent } from './examples/all';
import { ExampleCheckboxChangeComponent } from './examples/change';
import { NtFormsModule } from '@ng-tangram/components/forms';

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
