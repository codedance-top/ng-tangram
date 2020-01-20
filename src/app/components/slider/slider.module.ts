import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtSliderModule } from '@ng-tangram/components';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleSliderBasciComponent } from './examples/basic';
import { SliderDocumentComponent } from './slider.component';

@NgModule({
  imports: [
    CommonModule,
    NtSliderModule,
    NtExampleModule,
    NtMarkdownModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: SliderDocumentComponent }
    ])
  ],
  declarations: [
    SliderDocumentComponent,
    ExampleSliderBasciComponent
  ]
})
export class SliderDocumentModule { }
