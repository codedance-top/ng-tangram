import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtCheckboxModule, NtSwitchModule } from '@ng-tangram/components';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { SwitchDocumentComponent } from './switch.component';
import { ExampleSwitchBasciComponent } from './examples/basic';
import { ExampleSwitchCircleComponent } from './examples/circle';
import { ExampleSwitchSizeComponent } from './examples/size';
import { ExampleSwitchDisabledComponent } from './examples/disabled';
import { ExampleSwitchCheckedComponent } from './examples/checked';
import { ExampleSwitchChangeComponent } from './examples/change';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtSwitchModule,
    NtCheckboxModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: SwitchDocumentComponent }
    ])],
  exports: [SwitchDocumentComponent],
  declarations: [
    SwitchDocumentComponent,
    ExampleSwitchBasciComponent,
    ExampleSwitchCircleComponent,
    ExampleSwitchSizeComponent,
    ExampleSwitchDisabledComponent,
    ExampleSwitchCheckedComponent,
    ExampleSwitchChangeComponent
  ],
})
export class SwitchDocumentModule { }
