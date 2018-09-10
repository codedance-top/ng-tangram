import { NtMenuModule } from '@ng-tangram/components/menu';
import { CommonModule } from '@angular/common';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtInputModule } from '@ng-tangram/components/input';

import { DemoInputBasicComponent } from './demos/basic';
import { InputDocumentComponent } from './input.component';
import { DemoInputGroupComponent } from './demos/group';
import { NtSelectModule } from '@ng-tangram/components/select';

@NgModule({
  imports: [
    CommonModule,
    NtInputModule,
    NtExampleModule,
    NtButtonModule,
    NtDropdownModule,
    NtMenuModule,
    NtSelectModule,
    NtIconModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: InputDocumentComponent },
    ])
  ],
  declarations: [InputDocumentComponent, DemoInputBasicComponent, DemoInputGroupComponent]
})
export class InputDocumentModule { }
