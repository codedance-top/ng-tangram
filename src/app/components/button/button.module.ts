import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ButtonDocumentComponent } from './button.component';
import { ExampleButtonBasicComponent } from './examples/basic';
import { ExampleButtonGroupComponent } from './examples/group';

@NgModule({
  imports: [
    NtButtonModule,
    NtExampleModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: ButtonDocumentComponent }
    ])
  ],
  declarations: [
    ButtonDocumentComponent,
    ExampleButtonBasicComponent,
    ExampleButtonGroupComponent
  ]
})
export class ButtonDocumentModule { }
