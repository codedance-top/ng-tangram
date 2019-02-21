
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtModalModule } from '@ng-tangram/components/modal';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtExampleModule } from '@ng-tangram/example';

import { ModalDocumentComponent } from './modal.component';
import { ExampleModalBasicComponent, ExampleModalComponentDialogComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtModalModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: ModalDocumentComponent }
    ])],
  declarations: [ModalDocumentComponent, ExampleModalBasicComponent, ExampleModalComponentDialogComponent],
  entryComponents: [ExampleModalComponentDialogComponent]
})
export class ModalDocumentModule { }
