import { ComponentRef, EmbeddedViewRef, EventEmitter } from '@angular/core';
import { BasePortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ComponentPortal } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';
import { NtModalConfig } from './modal-config';
export declare function throwNtModalContentAlreadyAttachedError(): void;
export declare class NtModalComponent extends BasePortalOutlet {
    private _portalOutlet;
    _config: NtModalConfig;
    config: NtModalConfig;
    state: 'void' | 'enter' | 'exit';
    animationStateChanged: EventEmitter<AnimationEvent>;
    constructor();
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    onAnimationDone(event: AnimationEvent): void;
    onAnimationStart(event: AnimationEvent): void;
    exit(): void;
}
