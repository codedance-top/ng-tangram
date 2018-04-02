import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtBreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NtBreadcrumbsComponent],
  exports: [NtBreadcrumbsComponent]
})
export class NtBreadcrumbsModule { }
