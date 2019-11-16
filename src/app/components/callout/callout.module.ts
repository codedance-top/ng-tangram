import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { CalloutDocumentComponent } from './callout.component';
import { ExampleBasicCalloutComponent } from './examples/basic';
import { ExampleCalloutColorComponent } from './examples/color';
import { ExampleCalloutEventComponent } from './examples/event';
import { ExampleCalloutReactivesComponent } from './examples/reactives';
import { ExampleCalloutSizeComponent } from './examples/size';

@NgModule({
  imports: [
    NtCalloutModule,
    NtExampleModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: CalloutDocumentComponent }
    ])
  ],
  declarations: [
    CalloutDocumentComponent,
    ExampleBasicCalloutComponent,
    ExampleCalloutColorComponent,
    ExampleCalloutReactivesComponent,
    ExampleCalloutSizeComponent,
    ExampleCalloutEventComponent
  ]
})
export class CalloutDocumentModule { }

