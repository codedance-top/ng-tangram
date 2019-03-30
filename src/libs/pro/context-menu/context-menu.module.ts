import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtContextMenuComponent } from './context-menu.component';
import { NtContextMenuDirective } from './context-menu.directive';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  entryComponents: [NtContextMenuComponent],
  exports: [NtContextMenuDirective],
  declarations: [
    NtContextMenuComponent,
    NtContextMenuDirective
  ]
})
export class NtContextMenuModule { }
