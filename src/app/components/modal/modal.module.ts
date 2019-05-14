

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtModalModule } from '@ng-tangram/components/modal';
import { NtButtonModule } from '@ng-tangram/components';
import { NtExampleModule } from '@ng-tangram/example';

import { ExampleModalComponentContentComponent } from './examples/content';

import { ModalDocumentComponent } from './modal.component';
import { ExampleModalBasicComponent, ExampleModalComponentDialogComponent } from './examples/basic';
import { ExampleModalEventComponent } from './examples/event';
import { ExampleModalConfigComponent } from './examples/config';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { ExampleModalDataComponent, ExampleModalComponentDataComponent } from './examples/data';
import { ExampleModalWidthComponent } from './examples/width';
import { ExampleModalHeightComponent } from './examples/height';
import { ExampleModalTopComponent } from './examples/top';
import { ExampleModalClosableComponent } from './examples/closable';
import { ExampleModalHasBackdropComponent } from './examples/hasBackdrop';
import { ExampleModalCenterVerticallyComponent } from './examples/centerVertically';
import { ExampleModalTransparentComponent } from './examples/transparent';
import { ExampleModalClassComponent } from './examples/class';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtModalModule,
    NtExampleModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: ModalDocumentComponent }
    ])],
  declarations: [
    ModalDocumentComponent,
    ExampleModalBasicComponent,
    ExampleModalComponentDialogComponent,
    ExampleModalEventComponent,
    ExampleModalConfigComponent,
    ExampleModalComponentContentComponent,
    ExampleModalComponentDataComponent,
    ExampleModalDataComponent,
    ExampleModalWidthComponent,
    ExampleModalHeightComponent,
    ExampleModalTopComponent,
    ExampleModalClosableComponent,
    ExampleModalHasBackdropComponent,
    ExampleModalCenterVerticallyComponent,
    ExampleModalTransparentComponent,
    ExampleModalClassComponent
  ],
  entryComponents: [
    ExampleModalComponentDialogComponent,
    ExampleModalComponentContentComponent,
    ExampleModalComponentDataComponent
  ]
})
export class ModalDocumentModule { }
