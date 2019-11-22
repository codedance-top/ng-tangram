import { AnimationEvent, transition, trigger } from '@angular/animations';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal
} from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fadeIn, fadeOut } from '@ng-tangram/components/core';

@Component({
  selector: 'nt-contextmenu',
  template: `
    <div class="nt-overlay-container start-bottom-start-top">
      <div class="nt-overlay-shadow"></div>
      <div class="nt-overlay-pane">
        <ng-template cdkPortalOutlet></ng-template>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.05)),
      transition('* => exit', fadeOut(.1))
    ])
  ],
  host: {
    'class': 'nt-contextmenu',
    '(contextmenu)': '_onInteractionEvent($event)',
    '[@fade]': 'state',
    '(@fade.start)': 'onAnimationStart($event)',
    '(@fade.done)': 'onAnimationDone($event)',
  }
})
export class NtContextMenuComponent extends BasePortalOutlet {

  @ViewChild(CdkPortalOutlet, { static: true }) private _portalOutlet: CdkPortalOutlet;

  state: 'void' | 'enter' | 'exit' = 'enter';

  animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor() { super(); }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throw new Error('Attempting to attach context menu content after content is already attached');
    }
    return this._portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throw new Error('Attempting to attach context menu content after content is already attached');
    }
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  onAnimationDone(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  onAnimationStart(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  exit() {
    this.state = 'exit';
  }

  _onInteractionEvent(event: Event) {
    event.stopPropagation();
    return false;
  }
}
