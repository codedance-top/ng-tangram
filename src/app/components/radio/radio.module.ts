import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleRadioBasicComponent } from './examples/basic';
import { ExampleRadioChangeComponent } from './examples/change';
import { ExampleRadioClickComponent } from './examples/click';
import { ExampleRadioDisabledComponent } from './examples/disabled';
import { ExampleRadioGroupComponent } from './examples/group';
import { RadioDocumentComponent } from './radio.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NtFormsModule,
    NtExampleModule,
    NtRadioModule,
    RouterModule.forChild([
      { path: '', component: RadioDocumentComponent }
    ])
  ],
  declarations: [
    RadioDocumentComponent,
    ExampleRadioBasicComponent,
    ExampleRadioGroupComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioClickComponent,
    ExampleRadioChangeComponent
  ]
})
export class RadioDocumentModule { }
