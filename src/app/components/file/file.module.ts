import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFileModule } from '@ng-tangram/components/file';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleFileBasciComponent } from './examples/basic';
import { FileDocumentComponent } from './file.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    FormsModule,
    ReactiveFormsModule,
    NtFileModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: FileDocumentComponent }
    ])
  ],
  declarations: [FileDocumentComponent, ExampleFileBasciComponent]
})
export class FileDocumentModule { }
