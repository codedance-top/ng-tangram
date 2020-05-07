
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtBreadcrumbsModule } from '@ng-tangram/components/breadcrumbs';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { BreadcrumbsDocumentComponent } from './breadcrumbs.component';
import { ExampleBreadcrumbsBasicComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtBreadcrumbsModule,
    NtExampleModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: BreadcrumbsDocumentComponent }
    ])],
  declarations: [
    BreadcrumbsDocumentComponent,
    ExampleBreadcrumbsBasicComponent
  ],
})
export class BreadcrumbsDocumentModule { }
