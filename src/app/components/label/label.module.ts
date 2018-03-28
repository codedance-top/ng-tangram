
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { NtLabelModule } from '@ng-tangram/components/label';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon';

import { LabelDocumentComponent } from './label.component';
import { DemoLabelBasicComponent } from './demos/basic';
import { DemoLabelIconComponent } from './demos/icon';
import { DemoLabelColorsComponent } from './demos/colors';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtLabelModule,
    NtAntIconModule,
    RouterModule.forChild([
      { path: '', component: LabelDocumentComponent }
    ])],
  declarations: [LabelDocumentComponent, DemoLabelBasicComponent, DemoLabelIconComponent, DemoLabelColorsComponent],
})
export class LabelDocumentModule { }
