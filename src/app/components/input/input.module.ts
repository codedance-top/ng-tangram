import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtInputModule } from '@ng-tangram/components/input';

import { DemoInputBasicComponent } from './demos/basic';
import { InputDocumentComponent } from './input.component';

@NgModule({
  imports: [
    NtInputModule,
    NtExampleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: InputDocumentComponent }
    ])
  ],
  declarations: [InputDocumentComponent, DemoInputBasicComponent]
})
export class InputDocumentModule { }
