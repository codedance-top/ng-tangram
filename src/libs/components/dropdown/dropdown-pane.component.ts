import { Subject, Subscription, Observable } from 'rxjs';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentObserver } from '@angular/cdk/observers';
import {
  AfterContentInit, Component, ElementRef, Inject, InjectionToken, Input, OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent } from '@ng-tangram/components/core';

export declare type NtDropdownPaneSize = '' | 'tiny' | 'small' | 'large';

export interface NtDropdownParentComponent {
  overlay: NtOverlayComponent;
}

export const NT_DROPDOWN_PARENT_COMPONENT = new InjectionToken<NtDropdownParentComponent>('nt-dropdown-parent-component');

@Component({
  selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["nt-dropdown-pane", size, class].join(" ")',
    '[class.autosize]': 'autosize'
  }
})
export class NtDropdownPaneComponent implements AfterContentInit, OnDestroy {

  private _contentSubscription: Subscription;

  private _arrow = false;

  private _autosize = false;


  @Input() size: NtDropdownPaneSize = 'small';

  @Input() class: string = '';

  @Input()
  set autosize(value: boolean) {
    this._autosize = coerceBooleanProperty(value);
  }
  get autosize() { return this._autosize; }

  @Input()
  set arrow(value: boolean) { this._arrow = coerceBooleanProperty(value); }
  get arrow() { return this._arrow; }

  private _contentChange = new Subject();

  get contentChanged(): Observable<any> {
    return this._contentChange.asObservable();
  }

  get textContent(): string {
    return (this._elementRef.nativeElement.textContent || '').trim();
  }

  constructor(
    private _contentObserver: ContentObserver,
    private _elementRef: ElementRef,
    @Inject(NT_DROPDOWN_PARENT_COMPONENT) private _parent: NtDropdownParentComponent) {
  }

  ngAfterContentInit() {
    this._contentSubscription = this._contentObserver
      .observe(this._elementRef)
      .subscribe(() => this._checkContentChange());
  }

  ngOnDestroy() {
    if (this._contentSubscription) {
      this._contentSubscription.unsubscribe();
    }
  }

  private _checkContentChange() {
    if (this._parent.overlay.isOpen) {
      const cdkConnectedOverlay = this._parent.overlay.cdkConnectedOverlay;
      if (cdkConnectedOverlay && cdkConnectedOverlay.overlayRef) {
        cdkConnectedOverlay.overlayRef.updatePosition();
      }
    }
  }
}
