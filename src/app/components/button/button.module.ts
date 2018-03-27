import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon';

import { ButtonDocumentComponent } from './button.component';

import { DemoButtonBasicComponent } from './demos/basic';
import { DemoButtonGroupComponent } from './demos/group';

@NgModule({
  imports: [
    NtExampleModule,
    NtButtonModule,
    NtAntIconModule,
    RouterModule.forChild([
      { path: '', component: ButtonDocumentComponent }
    ])
  ],
  declarations: [ButtonDocumentComponent, DemoButtonBasicComponent, DemoButtonGroupComponent]
})
export class ButtonDocumentModule { }
