
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtPopoverModule } from '@ng-tangram/components/popover';
import { PopoverDocumentComponent } from './popover.component';

import { ExamplePopoverBasciComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPopoverModule,
    RouterModule.forChild([
      { path: '', component: PopoverDocumentComponent }
    ])],
  exports: [PopoverDocumentComponent],
  declarations: [PopoverDocumentComponent, ExamplePopoverBasciComponent],
})
export class PopoverDocumentModule { }
