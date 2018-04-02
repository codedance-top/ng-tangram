import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtIconModule } from '@ng-tangram/components/icon';

import { CalloutDocumentComponent } from './callout.component';

import { DemoBasicCalloutComponent } from './demos/basic';
import { DemoCalloutColorComponent } from './demos/color';
import { DemoCalloutReactivesComponent } from './demos/reactives';
import { DemoCalloutSizeComponent } from './demos/size';
import { DemoCalloutEventComponent } from './demos/event';

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
    DemoBasicCalloutComponent,
    DemoCalloutColorComponent,
    DemoCalloutReactivesComponent,
    DemoCalloutSizeComponent,
    DemoCalloutEventComponent
  ]
})
export class CalloutDocumentModule { }

