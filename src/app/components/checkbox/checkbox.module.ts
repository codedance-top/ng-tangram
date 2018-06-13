import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { CheckboxDocumentComponent } from './checkbox.component';
import { DemoCheckboxBasicComponent } from './demos/basic';
import { NtCheckboxModule } from '@ng-tangram/components/checkbox';

@NgModule({
  imports: [
    NtExampleModule,
    NtCheckboxModule,
    RouterModule.forChild([
      { path: '', component: CheckboxDocumentComponent }
    ])
  ],
  declarations: [CheckboxDocumentComponent, DemoCheckboxBasicComponent]
})
export class CheckboxDocumentModule { }
