
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { NtCheckboxModule } from '@ng-tangram/components/checkbox';
import { CheckboxDocumentComponent } from './checkbox.component';

import { DemoCheckboxBasicComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtCheckboxModule,
    RouterModule.forChild([
      { path: '', component: CheckboxDocumentComponent }
    ])
  ],
  declarations: [CheckboxDocumentComponent, DemoCheckboxBasicComponent],
})
export class CheckboxDocumentModule { }
