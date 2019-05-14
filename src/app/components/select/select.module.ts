import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtSelectModule } from '@ng-tangram/components/select';
import { NtExampleModule } from '@ng-tangram/example';
import { SelectDocumentComponent } from './select.component';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { ExampleSelectSingleComponent } from './examples/single';
import { ExampleSelectMultipleComponent } from  './examples/multiple';
import { ExampleSelectDisabledComponent } from './examples/disabled';
import { ExampleSelectRequiredComponent } from './examples/required';
import { ExampleSelectCompareWithComponent } from './examples/compareWith';
import { ExampleSelectPlaceholderComponent } from  './examples/placeholder';
import { ExampleSelectEventComponent } from './examples/event';
import { ExampleSelectFilterComponent } from './examples/filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtSelectModule,
    NtFormsModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: SelectDocumentComponent }
    ])],
  exports: [SelectDocumentComponent],
  declarations: [
    SelectDocumentComponent,
    ExampleSelectSingleComponent,
    ExampleSelectMultipleComponent,
    ExampleSelectDisabledComponent,
    ExampleSelectRequiredComponent,
    ExampleSelectCompareWithComponent,
    ExampleSelectPlaceholderComponent,
    ExampleSelectEventComponent,
    ExampleSelectFilterComponent
  ],
})
export class SelectDocumentModule { }
