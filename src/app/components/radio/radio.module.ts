import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtExampleModule } from '@ng-tangram/example';

import { RadioDocumentComponent } from './radio.component';
import { DemoRadioBasicComponent } from './demos/basic';
import { NtFormsModule } from '@ng-tangram/components/forms';

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
  declarations: [RadioDocumentComponent, DemoRadioBasicComponent]
})
export class RadioDocumentModule { }
