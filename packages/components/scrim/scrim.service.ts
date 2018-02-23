import { Injectable, ElementRef, Renderer2, ApplicationRef } from '@angular/core';

@Injectable()
export class NtScrimService {

  _scrim: ElementRef;

  constructor() {
    // this._scrim = this.renderer.createElement('div');
    // this.renderer.addClass(this._scrim.nativeElement, 'nt-scrim');
  }

  show(containerRef: any) {
    // this.renderer.appendChild(containerRef, this._scrim);
  }

  hide(containerRef: any) {
    // this.renderer.removeChild(containerRef, this._scrim);
  }
}
