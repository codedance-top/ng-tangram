import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtIconModule } from '@ng-tangram/components/icon';

import { ButtonDocumentComponent } from './button.component';

import { DemoButtonBasicComponent } from './demos/basic';
import { DemoButtonGroupComponent } from './demos/group';

@NgModule({
  imports: [
    NtExampleModule,
    NtButtonModule,
    NtIconModule,
    RouterModule.forChild([
      { path: '', component: ButtonDocumentComponent }
    ])
  ],
  declarations: [ButtonDocumentComponent, DemoButtonBasicComponent, DemoButtonGroupComponent]
})
export class ButtonDocumentModule { }
