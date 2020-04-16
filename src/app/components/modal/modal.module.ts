

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtModalModule } from '@ng-tangram/components/modal';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleModalBasicComponent, ExampleModalComponentDialogComponent } from './examples/basic';
import { ExampleModalCenterVerticallyComponent } from './examples/center-vertically';
import { ExampleModalClassComponent } from './examples/class';
import { ExampleModalClosableComponent } from './examples/closable';
import { ExampleModalConfigComponent } from './examples/config';
import { ExampleModalComponentContentComponent } from './examples/content';
import { ExampleModalComponentDataComponent, ExampleModalDataComponent } from './examples/data';
import { ExampleModalEventComponent } from './examples/event';
import { ExampleModalHasBackdropComponent } from './examples/hasBackdrop';
import { ExampleModalHeightComponent } from './examples/height';
import { ExampleModalTopComponent } from './examples/top';
import { ExampleModalTransparentComponent } from './examples/transparent';
import { ExampleModalWidthComponent } from './examples/width';
import { ModalDocumentComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtModalModule,
    NtExampleModule,
    NtMarkdownModule,
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
    ExampleModalComponentDataComponent,
    ExampleModalComponentContentComponent
  ]
})
export class ModalDocumentModule { }
