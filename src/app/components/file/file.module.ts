import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFileModule } from '@ng-tangram/components/file';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleFileAcceptComponent } from './examples/accept';
import { ExampleFileBasciComponent } from './examples/basic';
import { ExampleFileEventComponent } from './examples/event';
import { FileDocumentComponent } from './file.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownBlockModule,
    NtRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NtFileModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: FileDocumentComponent }
    ])
  ],
  declarations: [FileDocumentComponent, ExampleFileBasciComponent, ExampleFileEventComponent, ExampleFileAcceptComponent]
})
export class FileDocumentModule { }
