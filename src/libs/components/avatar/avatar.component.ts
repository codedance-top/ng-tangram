import { Component, Input, ViewChild, ViewEncapsulation, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NtModal } from '@ng-tangram/components/modal';
import { ThrowStmt } from '@angular/compiler';

export declare type NtAvatarShape = '' | 'circle' | 'square';

@Component({
  selector: 'nt-avatar',
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NtAvatarComponent {

  private _defaultSize = {
    'large': 64,
    'default': 40,
    'small': 32,
  }

  private _size: number = this._defaultSize['default'];

  @Input()
  get size() { return this._size; }
  set size(value: any) {
    if (value in this._defaultSize) {
      this._size = this._defaultSize[value];
      return;
    }
    this._size = coerceNumberProperty(value);
  }

  @Input() shape: NtAvatarShape = 'circle';

  @Input() thumbnail: string = '';

  @Input() src: string = '';

  @ViewChild('previewTemplate') previewTemplate: TemplateRef<any>;

  @ViewChild('avatarElement') avatarElement: ElementRef;

  constructor(
    private _modal: NtModal,
  ) { }

  preview() {
    this._modal.open(this.previewTemplate, {
      data: this.src || this.thumbnail,
      centerVertically: true,
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: 'auto',
      transparent: true
    });
  }
}
