
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtPopoverModule } from '@ng-tangram/components/popover';
import { PopoverDocumentComponent } from './popover.component';

import { DemoPopoverBasciComponent } from './demos/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtPopoverModule,
    RouterModule.forChild([
      { path: '', component: PopoverDocumentComponent }
    ])],
  exports: [PopoverDocumentComponent],
  declarations: [PopoverDocumentComponent, DemoPopoverBasciComponent],
})
export class PopoverDocumentModule { }
