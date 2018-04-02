
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtBreadcrumbsModule } from '@ng-tangram/components/breadcrumbs';
import { NtIconModule } from '@ng-tangram/components/icon';

import { BreadcrumbsDocumentComponent } from './breadcrumbs.component';
import { DemoBreadcrumbsBasicComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtBreadcrumbsModule,
    NtIconModule,
    RouterModule.forChild([
      { path: '', component: BreadcrumbsDocumentComponent }
    ])],
  declarations: [BreadcrumbsDocumentComponent, DemoBreadcrumbsBasicComponent],
})
export class BreadcrumbsDocumentModule { }
