import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtAttachmentModule } from '@ng-tangram/components/attachment';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { AttachmentDocumentComponent } from './attachment.component';
import { ExampleAttachmentAcceptComponent } from './examples/accept';
import { ExampleAttachmentBasciComponent } from './examples/basic';
import { ExampleAttachmentEventComponent } from './examples/event';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NtExampleModule,
    NtMarkdownModule,
    NtRadioModule,
    NtAttachmentModule,
    NtFormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AttachmentDocumentComponent }
    ])
  ],
  declarations: [
    AttachmentDocumentComponent,
    ExampleAttachmentBasciComponent,
    ExampleAttachmentEventComponent,
    ExampleAttachmentAcceptComponent
  ]
})
export class AttachmentDocumentModule { }
