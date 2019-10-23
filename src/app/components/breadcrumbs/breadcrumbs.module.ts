
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtBreadcrumbsModule } from '@ng-tangram/components/breadcrumbs';
import { NtExampleModule } from '@ng-tangram/example';

import { BreadcrumbsDocumentComponent } from './breadcrumbs.component';
import { ExampleBreadcrumbsBasicComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtBreadcrumbsModule,
    RouterModule.forChild([
      { path: '', component: BreadcrumbsDocumentComponent }
    ])],
  declarations: [BreadcrumbsDocumentComponent, ExampleBreadcrumbsBasicComponent],
})
export class BreadcrumbsDocumentModule { }
