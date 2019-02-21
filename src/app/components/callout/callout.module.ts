import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtIconModule } from '@ng-tangram/components/icon';

import { CalloutDocumentComponent } from './callout.component';

import { ExampleBasicCalloutComponent } from './examples/basic';
import { ExampleCalloutColorComponent } from './examples/color';
import { ExampleCalloutReactivesComponent } from './examples/reactives';
import { ExampleCalloutSizeComponent } from './examples/size';
import { ExampleCalloutEventComponent } from './examples/event';

@NgModule({
  imports: [
    NtIconModule,
    NtCalloutModule,
    NtExampleModule,
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

