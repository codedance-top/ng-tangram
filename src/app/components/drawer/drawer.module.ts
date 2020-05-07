import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtDrawerModule } from '@ng-tangram/components/drawer';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { DrawerDocumentComponent } from './drawer.component';
import { ExampleDrawerBackdropComponent } from './examples/backdrop';
import { ExampleDrawerBasicComponent } from './examples/basic';
import { ExampleDrawerEventComponent } from './examples/event';
import { ExampleDrawerNestedComponent } from './examples/nested';
import { ExampleDrawerPlacementComponent } from './examples/placement';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtExampleModule,
    NtDrawerModule,
    NtMarkdownModule,
    NtRadioModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DrawerDocumentComponent }
    ])
  ],
  declarations: [
    DrawerDocumentComponent,
    ExampleDrawerBasicComponent,
    ExampleDrawerEventComponent,
    ExampleDrawerBackdropComponent,
    ExampleDrawerNestedComponent,
    ExampleDrawerPlacementComponent
  ]
})
export class DrawerDocumentModule { }
