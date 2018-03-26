
import { Component, OnInit, Input, ViewEncapsulation, ComponentRef, EmbeddedViewRef, ViewChild, EventEmitter } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ComponentPortal, ComponentType, PortalInjector, PortalHost, DomPortalHost } from '@angular/cdk/portal';

import { trigger, transition, useAnimation, AnimationEvent } from '@angular/animations';
import { bounceIn, bounceOut } from '@ng-tangram/animate/bouncing';

import { NtModalConfig } from './modal-config';
import { NtModalRef } from './modal-ref';

export function throwNtModalContentAlreadyAttachedError() {
  throw Error('Attempting to attach modal content after content is already attached');
}

@Component({
  selector: 'nt-modal-container',
  template: `
    <ng-template cdkPortalOutlet></ng-template>
    <button *ngIf="config.closable" (click)="onExit()" class="close-button" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('zooming', [
      transition('void => *',  [useAnimation(bounceIn, { params: { timing: .5 } })]),
      transition('* => exit',  [useAnimation(bounceOut, { params: { timing: .5 } })])
    ])
  ],
  host: {
    'class': 'reveal',
    '[@zooming]': 'state',
    '(@zooming.start)': 'onAnimationStart($event)',
    '(@zooming.done)': 'onAnimationDone($event)',
  }
})
export class NtModalContainer extends BasePortalOutlet {

  @ViewChild(CdkPortalOutlet) private _portalOutlet: CdkPortalOutlet;

  _config: NtModalConfig;

  set config(value: NtModalConfig) { this._config = value; }
  get config () { return this._config; }

  state: 'void' | 'enter' | 'exit' = 'enter';

  animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor() { super(); }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throwNtModalContentAlreadyAttachedError();
    }
    return this._portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throwNtModalContentAlreadyAttachedError();
    }
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onExit() {
    this.state = 'exit';
  }
}
