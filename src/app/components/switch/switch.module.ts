import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtCheckboxModule, NtSwitchModule } from '@ng-tangram/components';
import { NtExampleModule } from '@ng-tangram/example';

import { DemoSwitchBasciComponent } from './demos/basic';
import { DemoSwitchCircleComponent } from './demos/circle';
import { SwitchDocumentComponent } from './switch.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtSwitchModule,
    NtCheckboxModule,
    RouterModule.forChild([
      { path: '', component: SwitchDocumentComponent }
    ])],
  exports: [SwitchDocumentComponent],
  declarations: [SwitchDocumentComponent, DemoSwitchBasciComponent, DemoSwitchCircleComponent],
})
export class SwitchDocumentModule { }
