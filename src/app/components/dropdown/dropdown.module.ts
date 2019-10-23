
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { DropdownDocumentComponent } from './dropdown.component';
import { ExampleDropdownBasicComponent } from './examples/basic';
import { ExampleDropdownChangeComponent } from './examples/change';
import { ExampleDropdownPositionComponent } from './examples/position';
import { ExampleDropdownTriggerComponent } from './examples/trigger';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownBlockModule,
    NtButtonModule,
    NtDropdownModule,
    RouterModule.forChild([
      { path: '', component: DropdownDocumentComponent }
    ])],
  declarations: [
    DropdownDocumentComponent,
    ExampleDropdownBasicComponent,
    ExampleDropdownChangeComponent,
    ExampleDropdownPositionComponent,
    ExampleDropdownTriggerComponent
  ]
})
export class DropdownDocumentModule { }
