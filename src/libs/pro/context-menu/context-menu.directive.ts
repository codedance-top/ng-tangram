import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { ComponentRef, Directive, ElementRef, Input, Optional, TemplateRef } from '@angular/core';

import { NtContextMenuRef } from './context-menu-ref';
import { NtContextMenuComponent } from './context-menu.component';

@Directive({
  selector: '[ntContextMenu]',
  host: {
    '(contextmenu)': '_open($event)'
  }
})
export class NtContextMenuDirective<T> {

  private _template: TemplateRef<any>;
  private _data: T | null;

  @Input()
  get template() { return this._template; }
  set template(value: TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._template = value;
    }
  }

  @Input()
  get data(): T | null { return this._data; }
  set data(value: T | null) { this._data = value; }

  constructor(
    @Optional() private _location: Location,
    private _elementRef: ElementRef,
    private _overlay: Overlay,
    private _overlayContainer: OverlayContainer) { }

  _open(event: MouseEvent) {
    if (NtContextMenuRef.currentRef) {
      NtContextMenuRef.currentRef.close();
    }

    if (event) {
      const overlayRef = this._createOverlay(event.offsetX, event.offsetY, event.target as HTMLElement);
      const menuContainerRef = this._attachModalContainer(overlayRef);
      const menuRef = this._attachModalContent(this.template, menuContainerRef, overlayRef);
    }
    return false;
  }

  private _createOverlay(x: number, y: number, element: HTMLElement) {
    let elementRef = this._elementRef;
    if (element && element !== elementRef.nativeElement) {
      elementRef = new ElementRef(element);
    }

    const overlayConfig = this._getOverlayConfig(x, y, elementRef);
    return this._overlay.create(overlayConfig);
  }

  private _attachModalContainer(overlayRef: OverlayRef) {
    const containerPortal = new ComponentPortal(NtContextMenuComponent, null);
    const containerRef: ComponentRef<NtContextMenuComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private _attachModalContent(
    content: TemplateRef<any>,
    menuContainer: NtContextMenuComponent,
    overlayRef: OverlayRef): NtContextMenuRef {

    const menuRef = new NtContextMenuRef(overlayRef, menuContainer, this._location);

    const overlayClose = () => {
      menuRef.close();
      return false;
    };

    overlayRef.backdropClick().subscribe(overlayClose);

    overlayRef.backdropElement.oncontextmenu = overlayClose;

    menuContainer.attachTemplatePortal(new TemplatePortal(content, null!, <any>{ $implicit: this.data, menuRef }));

    return menuRef;
  }

  private _getOverlayConfig(x: number, y: number, elementRef: ElementRef): OverlayConfig {

    const position: ConnectedPosition = {
      originX: 'start', originY: 'top',
      overlayX: 'start', overlayY: 'top'
    };

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(elementRef)
      .withPositions([position])
      .withDefaultOffsetX(x)
      .withDefaultOffsetY(y);

    const overlayConfig = new OverlayConfig({
      // panelClass: config.panelClass,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: positionStrategy,
      hasBackdrop: true
    });

    return overlayConfig;
  }
}
