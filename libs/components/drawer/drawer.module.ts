import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtDrawerContainerDirective } from './drawer-container.directive';
import { NtDrawerComponent } from './drawer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NtDrawerComponent,
    NtDrawerContainerDirective
  ],
  declarations: [
    NtDrawerComponent,
    NtDrawerContainerDirective
  ]
})
export class NtDrawerModule { }
