
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtMenuModule } from '@ng-tangram/components/menu';

import { MenuDocumentComponent } from './menu.component';
import { ExampleMenuBasicComponent } from './examples/basic';
import { ExampleMenuAlignComponent } from './examples/align';
import { ExampleMenuNestedComponent } from './examples/nested';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMenuModule,
    RouterModule.forChild([
      { path: '', component: MenuDocumentComponent }
    ])],
  declarations: [MenuDocumentComponent, ExampleMenuBasicComponent, ExampleMenuAlignComponent, ExampleMenuNestedComponent],
})
export class MenuDocumentModule { }
