
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example';
import { MapDocumentComponent } from './map.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: MapDocumentComponent }
    ])],
  exports: [MapDocumentComponent],
  declarations: [MapDocumentComponent],
})
export class MapDocumentModule { }
