import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { NtCalloutModule } from '@ng-tangram/components/callout';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon';

import { CalloutDocumentComponent } from './callout.component';

import { DemoBasicCalloutComponent } from './demos/basic';
import { DemoCalloutColorComponent } from './demos/color';
import { DemoCalloutReactivesComponent } from './demos/reactives';
import { DemoCalloutSizeComponent } from './demos/size';
import { DemoCalloutEventComponent } from './demos/event';

@NgModule({
  imports: [
    NtAntIconModule,
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

