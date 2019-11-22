import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtContextMenuComponent } from './contextmenu.component';
import { NtContextMenuDirective } from './contextmenu.directive';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  exports: [NtContextMenuDirective],
  declarations: [
    NtContextMenuComponent,
    NtContextMenuDirective
  ]
})
export class NtContextMenuModule { }
