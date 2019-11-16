import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtDrawerModule } from '@ng-tangram/components/drawer';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { DrawerDocumentComponent } from './drawer.component';
import { ExampleDrawerBasciComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtExampleModule,
    NtDrawerModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: DrawerDocumentComponent }
    ])
  ],
  declarations: [DrawerDocumentComponent, ExampleDrawerBasciComponent]
})
export class DrawerDocumentModule { }
