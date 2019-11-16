import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';
import { NtInputModule } from '@ng-tangram/components/input';
import { NtMenuModule } from '@ng-tangram/components/menu';
import { NtSelectModule } from '@ng-tangram/components/select';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleInputBasicComponent } from './examples/basic';
import { ExampleInputGroupComponent } from './examples/group';
import { InputDocumentComponent } from './input.component';

@NgModule({
  imports: [
    CommonModule,
    NtInputModule,
    NtExampleModule,
    NtButtonModule,
    NtDropdownModule,
    NtMenuModule,
    NtSelectModule,
    NtMarkdownModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: InputDocumentComponent },
    ])
  ],
  declarations: [InputDocumentComponent, ExampleInputBasicComponent, ExampleInputGroupComponent]
})
export class InputDocumentModule { }
