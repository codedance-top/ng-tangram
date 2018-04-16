import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal, ComponentType, DomPortalHost, PortalHost, PortalInjector, TemplatePortal
} from '@angular/cdk/portal';
import { Location } from '@angular/common';
import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, InjectionToken,
  Injector, Optional, TemplateRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NtModalConfig } from './modal-config';
import { NtModalComponent } from './modal.component';
import { NtModalRef } from './modal-ref';

export const NT_MODAL_DATA = new InjectionToken<any>('nt-modal-data');
export const NT_MODAL_DEFAULT_CONFIG = new InjectionToken<NtModalConfig>('nt-model-default-config');
export type NtModalContent<T> = TemplateRef<T> | ComponentType<T>;

@Injectable()
export class NtModal {

  private _openModalsAtThisLevel: NtModalRef<any>[] = [];
  private _afterAllClosedAtThisLevel = new Subject<void>();
  private _afterOpenAtThisLevel = new Subject<NtModalRef<any>>();

  constructor(
    @Optional() private _location: Location,
    @Optional() @Inject(NT_MODAL_DEFAULT_CONFIG) private _defaultConfig: NtModalConfig,
    private _overlay: Overlay,
    private _injector: Injector,
    private _overlayContainer: OverlayContainer,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef) { }

  open<T = any>(content: NtModalContent<T>, config: NtModalConfig = {}): NtModalRef<T, any> {

    config = { ...this._defaultConfig || new NtModalConfig(), ...config };

    const overlayRef = this._createOverlay(config);
    const modalContainerRef = this._attachModalContainer(overlayRef, config);
    const modalRef = this._attachModalContent(content, modalContainerRef, overlayRef, config);

    this._openModalsAtThisLevel.push(modalRef);
    modalRef.afterClosed().subscribe(() => this._removeOpenModal(modalRef));
    this._afterOpenAtThisLevel.next(modalRef);

    return modalRef;
  }

  private _createOverlay(config: NtModalConfig) {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  private _attachModalContainer(overlayRef: OverlayRef, config: NtModalConfig) {
    const containerPortal = new ComponentPortal(NtModalComponent, null);
    const containerRef: ComponentRef<NtModalComponent> = overlayRef.attach(containerPortal);
    containerRef.instance.config = config;
    return containerRef.instance;
  }

  private _attachModalContent<T>(
    content: NtModalContent<T>,
    modalContainer: NtModalComponent,
    overlayRef: OverlayRef,
    config: NtModalConfig): NtModalRef<T> {

    const modalRef = new NtModalRef<T>(overlayRef, modalContainer, this._location, config.id);

    if (config.hasBackdrop) {
      overlayRef.backdropClick().subscribe(() => {
        // if (modalRef.closable) {
        modalRef.close();
        // }
      });
    }

    if (content instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(new TemplatePortal<T>(content, null!, <any>{ $implicit: config.data, modalRef }));
    } else {
      const injector = this._createInjector<T>(config, modalRef, modalContainer);
      const contentRef = modalContainer.attachComponentPortal<T>(new ComponentPortal(content, undefined, injector));
      modalRef.componentInstance = contentRef.instance;
    }

    return modalRef;
  }

  /**
 * Removes a modal from the array of open modals.
 * @param modalRef modal to be removed.
 */
  private _removeOpenModal(modalRef: NtModalRef<any>) {
    const index = this._openModalsAtThisLevel.indexOf(modalRef);

    if (index > -1) {
      this._openModalsAtThisLevel.splice(index, 1);

      if (!this._openModalsAtThisLevel.length) {
        this._afterAllClosedAtThisLevel.next();
      }
    }
  }

  private _createInjector<T>(config: NtModalConfig, modalRef: NtModalRef<T>, modalContainer: NtModalComponent): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(NtModalRef, modalRef);
    injectionTokens.set(NtModalComponent, modalContainer);
    injectionTokens.set(NT_MODAL_DATA, config.data);
    return new PortalInjector(this._injector, injectionTokens);
  }

  private _getOverlayConfig(config: NtModalConfig): OverlayConfig {
    const positionStrategy = this._overlay.position()
      .global()
      .centerHorizontally()
      .top('100px');

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      positionStrategy
    });

    return overlayConfig;
  }
}
