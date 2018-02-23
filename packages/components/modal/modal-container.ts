
import { Component, OnInit, Input, ViewEncapsulation, ComponentRef, EmbeddedViewRef, ViewChild, EventEmitter } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ComponentPortal, ComponentType, PortalInjector, PortalHost, DomPortalHost } from '@angular/cdk/portal';

import { trigger, transition, useAnimation, AnimationEvent } from '@angular/animations';
import { bounceIn, bounceOut } from '../../animate/bouncing';

import { NtModalConfig } from './modal-config';
import { NtModalRef } from './modal-ref';

export function throwNtModalContentAlreadyAttachedError() {
  throw Error('Attempting to attach modal content after content is already attached');
}

@Component({
  selector: 'nt-modal-container',
  template: `
    <ng-template cdkPortalOutlet></ng-template>
    <button *ngIf="_config.closable" (click)="onExit()" class="close-button" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['modal.component.scss'],
  animations: [
    trigger('zooming', [
      transition('void => *',  [useAnimation(bounceIn, { params: { timing: .5 } })]),
      transition('* => exit',  [useAnimation(bounceOut, { params: { timing: .5 } })])
    ])
  ],
  host: {
    'class': 'reveal',
    '[@zooming]': '_state',
    '(@zooming.start)': 'onAnimationStart($event)',
    '(@zooming.done)': 'onAnimationDone($event)',
  }
})
export class NtModalContainer extends BasePortalOutlet {

  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  _config: NtModalConfig;

  /** State of the modal animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Emits when an animation state changes. */
  _animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor() {
    super();
  }

  /**
 * Attach a ComponentPortal as content to this modal container.
 * @param portal Portal to be attached as the modal content.
 */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throwNtModalContentAlreadyAttachedError();
    }
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /**
 * Attach a TemplatePortal as content to this modal container.
 * @param portal Portal to be attached as the modal content.
 */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throwNtModalContentAlreadyAttachedError();
    }
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  onAnimationDone(event: AnimationEvent) {
    this._animationStateChanged.emit(event);
  }

  onAnimationStart(event: AnimationEvent) {
    this._animationStateChanged.emit(event);
  }

  onExit() {
    this._state = 'exit';
  }
}
