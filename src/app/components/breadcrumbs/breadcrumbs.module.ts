
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtBreadcrumbsModule } from '@ng-tangram/components/breadcrumbs';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon';

import { BreadcrumbsDocumentComponent } from './breadcrumbs.component';
import { DemoBreadcrumbsBasicComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtBreadcrumbsModule,
    NtAntIconModule,
    RouterModule.forChild([
      { path: '', component: BreadcrumbsDocumentComponent }
    ])],
  declarations: [BreadcrumbsDocumentComponent, DemoBreadcrumbsBasicComponent],
})
export class BreadcrumbsDocumentModule { }
