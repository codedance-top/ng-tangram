import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtDrawerModule } from '@ng-tangram/pro';

import { ExampleDrawerBasciComponent } from './examples/basic';
import { DrawerDocumentComponent } from './drawer.component';
import { NtButtonModule } from '@ng-tangram/components/button';

@NgModule({
  imports: [
    CommonModule,
    NtButtonModule,
    NtExampleModule,
    NtDrawerModule,
    RouterModule.forChild([
      { path: '', component: DrawerDocumentComponent }
    ])
  ],
  declarations: [DrawerDocumentComponent, ExampleDrawerBasciComponent]
})
export class DrawerDocumentModule { }
