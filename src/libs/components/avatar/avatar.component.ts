import { Component, Input, ViewChild, ViewEncapsulation, TemplateRef} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { NtModal } from '@ng-tangram/components/modal';

export declare type NtAvatarShape = '' | 'circle' | 'square';

@Component({
  selector: 'nt-avatar',
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NtAvatarComponent {

  private sizeMap = {
    'large': 64,
    'default': 40,
    'small': 32,
  }

  private _size: number = this.sizeMap['default'];

  @Input()
  get size() { return this._size; }
  set size(value: any) {
    if (value in this.sizeMap) {
      this._size = this.sizeMap[value];
      return;
    }
    this._size = coerceNumberProperty(value);
  }

  @Input() shape: NtAvatarShape = 'circle';

  @Input() thumbnail: string = '';

  @Input() src: string = '';

  @ViewChild('previewTemplate') previewTemplate: TemplateRef<any>;

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
