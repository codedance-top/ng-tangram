import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, InjectionToken, Injector, TemplateRef } from '@angular/core';
import { NtModalConfig } from './modal-config';
import { NtModalRef } from './modal-ref';
export declare const NT_MODAL_DATA: InjectionToken<any>;
export declare const NT_MODAL_DEFAULT_CONFIG: InjectionToken<NtModalConfig<any>>;
export declare type NtModalContent<T> = TemplateRef<T> | ComponentType<T>;
export declare class NtModal {
    private _location;
    private _defaultConfig;
    private _overlay;
    private _injector;
    private _overlayContainer;
    private _componentFactoryResolver;
    private _applicationRef;
    private _openModalsAtThisLevel;
    private _afterAllClosedAtThisLevel;
    private _afterOpenAtThisLevel;
    constructor(_location: Location, _defaultConfig: NtModalConfig, _overlay: Overlay, _injector: Injector, _overlayContainer: OverlayContainer, _componentFactoryResolver: ComponentFactoryResolver, _applicationRef: ApplicationRef);
    open<T = any>(content: NtModalContent<T>, config?: NtModalConfig): NtModalRef<T, any>;
    private _createOverlay(config);
    private _attachModalContainer(overlayRef, config);
    private _attachModalContent<T>(content, modalContainer, overlayRef, config);
    /**
   * Removes a modal from the array of open modals.
   * @param modalRef modal to be removed.
   */
    private _removeOpenModal(modalRef);
    private _createInjector<T>(config, modalRef, modalContainer);
    private _getOverlayConfig(config);
}
