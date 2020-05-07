
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtMenuModule } from '@ng-tangram/components/menu';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleMenuAlignComponent } from './examples/align';
import { ExampleMenuBasicComponent } from './examples/basic';
import { ExampleMenuNestedComponent } from './examples/nested';
import { MenuDocumentComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMenuModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: MenuDocumentComponent }
    ])],
  declarations: [MenuDocumentComponent, ExampleMenuBasicComponent, ExampleMenuAlignComponent, ExampleMenuNestedComponent],
})
export class MenuDocumentModule { }
