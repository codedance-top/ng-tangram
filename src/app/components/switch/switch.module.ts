import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtCheckboxModule, NtSwitchModule } from '@ng-tangram/components';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleSwitchBasciComponent } from './examples/basic';
import { ExampleSwitchChangeComponent } from './examples/change';
import { ExampleSwitchCheckedComponent } from './examples/checked';
import { ExampleSwitchCircleComponent } from './examples/circle';
import { ExampleSwitchDisabledComponent } from './examples/disabled';
import { ExampleSwitchSizeComponent } from './examples/size';
import { SwitchDocumentComponent } from './switch.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtSwitchModule,
    NtCheckboxModule,
    NtMarkdownModule,
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
