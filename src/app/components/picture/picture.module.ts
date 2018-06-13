import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtPictureModule } from '@ng-tangram/components/picture';
import { NtExampleModule } from '@ng-tangram/example';

import { DemoPictureBasciComponent } from './demos/basic';
import { PictureDocumentComponent } from './picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtExampleModule,
    NtIconModule,
    NtPictureModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: PictureDocumentComponent }
    ])
  ],
  declarations: [PictureDocumentComponent, DemoPictureBasciComponent]
})
export class PictureDocumentModule { }
