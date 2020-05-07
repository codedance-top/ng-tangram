import { Directive, ElementRef } from '@angular/core';

import { NT_DRAWER_CONTAINER, NtDrawerContainer } from './drawer.component';

@Directive({
  selector: '[nt-drawer-container]',
  providers: [
    { provide: NT_DRAWER_CONTAINER, useExisting: NtDrawerContainerDirective }
  ],
  host: {
    'class': 'nt-drawer-container'
  }
})
export class NtDrawerContainerDirective implements NtDrawerContainer {

  readonly element: HTMLElement;

  constructor(_element: ElementRef) {
    this.element = _element.nativeElement;
  }
}
