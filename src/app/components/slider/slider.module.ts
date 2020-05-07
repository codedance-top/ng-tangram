import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtInputModule } from '@ng-tangram/components/input';
import { NtSliderModule } from '@ng-tangram/components/slider';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleSliderBasicComponent } from './examples/basic';
import { ExampleSliderEventsComponent } from './examples/events';
import { ExampleSliderFormsComponent } from './examples/forms';
import { ExampleSliderInputComponent } from './examples/input';
import { ExampleSliderMinMaxComponent } from './examples/min-and-max';
import { ExampleSliderRangeComponent } from './examples/range';
import { ExampleSliderStepComponent } from './examples/step';
import { ExampleSliderStepmarkComponent } from './examples/stepmark';
import { ExampleSliderVerticalComponent } from './examples/vertical';
import { SliderDocumentComponent } from './slider.component';

@NgModule({
  imports: [
    CommonModule,
    NtSliderModule,
    NtExampleModule,
    NtMarkdownModule,
    NtInputModule,
    FormsModule,
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
    ExampleSliderEventsComponent,
    ExampleSliderFormsComponent,
    ExampleSliderVerticalComponent,
    ExampleSliderInputComponent
  ]
})
export class SliderDocumentModule { }
