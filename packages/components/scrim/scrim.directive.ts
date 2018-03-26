import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnDestroy,
  OnInit, Renderer2, ViewContainerRef, ComponentFactory
} from '@angular/core';
import { fadeIn } from '@ng-tangram/animate/fading';

import { NtScrimComponent } from './scrim.component';

@Directive({
  selector: '[ntScrim]'
})
export class NtScrimDirective implements OnDestroy {

  private _componentRef: ComponentRef<NtScrimComponent>;

  @Input('ntScrimText')
  set text(value: string) { this._componentRef.instance.text = value; }

  @Input('ntScrim')
  set scrim(value: boolean) { this._componentRef.instance.isOpen = coerceBooleanProperty(value); }

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef) {

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(NtScrimComponent);
    this._componentRef = this._viewContainerRef.createComponent(componentFactory);
    const style = window.getComputedStyle(this._elementRef.nativeElement);
    if (style.position !== 'absolute' || style.position !== 'absolute') {
      this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');
    }
    this._renderer.appendChild(this._elementRef.nativeElement, this._componentRef.location.nativeElement);
  }

  ngOnDestroy() {
    this._renderer.removeChild(this._elementRef.nativeElement, this._componentRef.location.nativeElement);
    this._componentRef.destroy();
  }
}
