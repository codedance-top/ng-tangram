
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtModalModule } from '@ng-tangram/components/modal';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtExampleModule } from '@modules/example';

import { ModalDocumentComponent } from './modal.component';
import { DemoModalBasicComponent, DemoModalComponentDialogComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtModalModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: ModalDocumentComponent }
    ])],
  declarations: [ModalDocumentComponent, DemoModalBasicComponent, DemoModalComponentDialogComponent],
  entryComponents: [DemoModalComponentDialogComponent]
})
export class ModalDocumentModule { }
