import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFileModule } from '@ng-tangram/components/file';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { NtRadioModule } from '@ng-tangram/components/radio';

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
  declarations: [FileDocumentComponent, ExampleFileBasciComponent, ExampleFileEventComponent]
})
export class FileDocumentModule { }
