import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtPictureModule } from '@ng-tangram/components/picture';
import { NtExampleModule } from '@ng-tangram/example';

import { ExamplePictureBasciComponent } from './examples/basic';
import { PictureDocumentComponent } from './picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtPictureModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: PictureDocumentComponent }
    ])
  ],
  declarations: [PictureDocumentComponent, ExamplePictureBasciComponent]
})
export class PictureDocumentModule { }
