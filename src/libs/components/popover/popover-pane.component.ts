import { Observable, Subject, Subscription } from 'rxjs';

import { ContentObserver } from '@angular/cdk/observers';
import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent } from '@ng-tangram/components/overlay';

export interface NtPopoverParentComponent {
  overlay: NtOverlayComponent;
}

export const NT_POPOVER_PARENT_COMPONENT = new InjectionToken<NtPopoverParentComponent>('nt-popover-parent-component');

@Component({
  selector: 'nt-popover-pane, [nt-popover-pane]',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NtPopoverPaneComponent implements AfterContentInit {

  private _contentSubscription: Subscription;

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
    @Inject(NT_POPOVER_PARENT_COMPONENT) private _parent: NtPopoverParentComponent) {
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
    if (this._parent.overlay.opened) {
      this._parent.overlay.forceUpdatePosition();
    }
  }
}
