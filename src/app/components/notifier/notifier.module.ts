import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleNotifierBasicComponent } from './examples/basic';
import { ExampleNotifierGroupComponent } from './examples/group';
import { NotifierDocumentComponent } from './notifier.component';

@NgModule({
  imports: [
    NtButtonModule,
    NtExampleModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: NotifierDocumentComponent }
    ])
  ],
  declarations: [
    NotifierDocumentComponent,
    ExampleNotifierBasicComponent,
    ExampleNotifierGroupComponent
  ]
})
export class NotifierDocumentModule { }
