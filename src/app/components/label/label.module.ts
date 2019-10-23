
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtLabelModule } from '@ng-tangram/components/label';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleLabelBasicComponent } from './examples/basic';
import { ExampleLabelColorsComponent } from './examples/colors';
import { ExampleLabelIconComponent } from './examples/icon';
import { LabelDocumentComponent } from './label.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtLabelModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: LabelDocumentComponent }
    ])],
  declarations: [LabelDocumentComponent, ExampleLabelBasicComponent, ExampleLabelIconComponent, ExampleLabelColorsComponent],
})
export class LabelDocumentModule { }
