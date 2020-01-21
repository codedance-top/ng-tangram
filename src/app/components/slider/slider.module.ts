import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtSliderModule } from '@ng-tangram/components';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleSliderBasicComponent } from './examples/basic';
import { ExampleSliderEventsComponent } from './examples/events';
import { ExampleSliderMinMaxComponent } from './examples/min-and-max';
import { ExampleSliderRangeComponent } from './examples/range';
import { ExampleSliderStepComponent } from './examples/step';
import { ExampleSliderStepmarkComponent } from './examples/stepmark';
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
    ExampleSliderBasicComponent,
    ExampleSliderStepComponent,
    ExampleSliderStepmarkComponent,
    ExampleSliderMinMaxComponent,
    ExampleSliderRangeComponent,
    ExampleSliderEventsComponent
  ]
})
export class SliderDocumentModule { }
