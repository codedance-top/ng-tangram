import loadImage from 'blueimp-load-image';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { HttpProgressEvent } from '@angular/common/http';
import {
    Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output, Self, TemplateRef,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
    fadeIn, fadeOut, NT_UPLOAD_HANDLER, NtUploadFile, NtUploadHandler, NtUploadStatus
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NtModal } from '@ng-tangram/components/modal';

import {
    NtPictureAcceptError, NtPictureError, NtPictureSizeError, NtPictureUploadError
} from './picture-errors';
import { NT_PICTURE_ICONS, NtPictureIcons } from './picture-icons';

/**
 * 压缩图片
 */
export function zipImage( file: File, option: any = { maxWidth: 1080, orientation: true, canvas: true }): Promise<any> {
  return new Promise((resolve, reject) => {
    loadImage(file, (canvas: HTMLCanvasElement) => {
      if (canvas.toBlob) {
        canvas.toBlob((blob: any) => {
          let thumbnail = canvas.toDataURL('image/png');
          blob.lastModifiedDate = new Date();
          blob.lastModified = blob.lastModifiedDate.getTime();
          resolve({ thumbnail, blob });
        });
      } else {
        reject('HTMLCanvasElement toBlob function is undefined');
      }
    }, option);
  });
}

let uniqueId = 0;

export const NT_PICTURE_ACCEPTS = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];

export class NtPicture extends NtUploadFile {
  id: string = `nt-picture-${uniqueId++}`;
  progress?: number;
  uploader?: Subscription;
  thumbnail: string;
}

@Component({
  selector: 'nt-picture',
  templateUrl: 'picture.component.html',
  host: {
    'class': 'nt-picture'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtPictureComponent }
  ],
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.3)),
      transition('void => *', fadeIn(.3))
    ]),
    trigger('fadeOut', [
      transition('* => void', fadeOut(.3))
    ])
  ]
})
export class NtPictureComponent extends NtFormFieldControl<NtPicture[]> implements OnInit, ControlValueAccessor {

  private readonly _destroy = new Subject<void>();

  private _accept = NT_PICTURE_ACCEPTS;

  files: NtPicture[] = [];

  private _value: NtPicture[] = [];

  get value() { return this._value; }

  private _disabled = false;

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  private _readonly = false;

  @Input()
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  get readonly() { return this._readonly; }

  private _required = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  @Input()
  set accept(value: string | Array<string>) {
    if (typeof value === 'string') {
      if (value === '*') {
        this._accept = NT_PICTURE_ACCEPTS;
      } else {
        this._accept = value.replace(' ', '').split(',').filter(accept => NT_PICTURE_ACCEPTS.indexOf(accept) > -1);
      }
    } else {
      this._accept = coerceArray(value).filter(accept => NT_PICTURE_ACCEPTS.indexOf(accept) > -1);
    }
  }
  get accept() { return this._accept; }

  private _maxSize = 5;

  @Input()
  set maxSize(value: number) { this._maxSize = coerceNumberProperty(value, 5); }
  get maxSize() { return this._maxSize; }

  private _maxFiles = 1;

  @Input()
  set maxFiles(value: number) { this._maxFiles = coerceNumberProperty(value, 1); }
  get maxFiles() { return this._maxFiles; }

  private _autoupload = true;

  @Input()
  set autoupload(value: boolean) { this._autoupload = coerceBooleanProperty(value); }
  get autoupload() { return this._autoupload; }

  @Input() url: string = '';

  @Input() name: string = '';

  @Input() type: '' | 'circle' | 'square' = '';

  @ViewChild('fileElement', { static: true }) fileElement: ElementRef;

  @ViewChild('previewTemplate', { static: true }) previewTemplate: TemplateRef<any>;

  @Output() error = new EventEmitter<NtPictureError>();

  @Output() remove = new EventEmitter<NtPicture>();

  private _onChange: (value: any) => void = () => {};

  private _onTouched = () => {};

  constructor(
    private _modal: NtModal,
    @Self() @Optional() public ngControl: NgControl,
    @Inject(NT_UPLOAD_HANDLER) private _uploader: NtUploadHandler,
    @Inject(NT_PICTURE_ICONS) public icons: NtPictureIcons) {
      super();
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.error.complete();
    this.remove.complete();
  }

  onTriggerClick() {
    if (this.files.length < this.maxFiles) {
      this.fileElement.nativeElement.click();
    }
  }

  writeValue(value: NtPicture[]) {
    if (value) {
      this._value.length = 0;
      this._value.push(...value);
      this.files.length = 0;
      this.files.push(...this._value);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  async _fileChanged() {

    const file = this.fileElement.nativeElement.files[0];
    if (file && this.files.length < this.maxFiles) {

      if (!this._fileSizeValid(file)) {
        this.error.next(new NtPictureSizeError(file, this.maxSize * 1024 * 1024, `${this.maxSize}MB`));
        return;
      }

      if (!this._fileTypeValid(file)) {
        this.error.next(new NtPictureAcceptError(file, file.type));
        return;
      }

      const picture = new NtPicture(file.name, file.size, file.type);
      this.files.push(picture);

      const data = await zipImage(file);
      picture.thumbnail = data.thumbnail;

      const handlers = {
        begin: () => this._onUploadBegin(picture),
        progress: percent => this._onUploadProgress(percent, picture),
        done: () => this._onUploadDone(picture)
      };

      if (this.autoupload) {

        picture.uploader = this._uploader
          .upload(this.url, file, this.name, handlers)
          .pipe(takeUntil(this._destroy))
          .subscribe(result => {
            if ((picture.status = result.status) === NtUploadStatus.SUCCESS) {
              picture.data = result.data;
              this._value.push(picture);
              this._onChange(this._value);
            }
          }, error => {
            picture.status = NtUploadStatus.ERROR;
            picture.error = error.statusText;
            picture.progress = 100;
            this.error.next(new NtPictureUploadError(error.status, error.statusText));
          });
      }
    }
    this._onTouched && this._onTouched();
    this.fileElement.nativeElement.value = '';
  }

  removeFile(file: NtPicture) {
    if (this.disabled) {
      return;
    }
    file.uploader && file.uploader.unsubscribe();
    const vindex = this._value.indexOf(file);
    vindex > -1 && this._value.splice(vindex, 1);

    const findex = this.files.indexOf(file);
    findex > -1 && this.files.splice(findex, 1);

    this.remove.next(file);
    this._onChange(this._value);
  }

  preview(file: NtPicture) {
    this._modal.open(this.previewTemplate, {
      data: file,
      centerVertically: true,
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: 'auto',
      transparent: true
    });
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  private _fileTypeValid(file: File) {
    if (file) {
      return this.accept.indexOf(file.type) > -1 || this.accept.indexOf('*') > -1;
    }
    return false;
  }

  private _fileSizeValid(file: File) {
    if (file) {
      return file.size <= this.maxSize * 1024 * 1024;
    }
    return false;
  }

  private _onUploadBegin(file: NtPicture) {
    file.status = NtUploadStatus.SENDING;
  }

  private _onUploadProgress(percent: number, file: NtPicture) {
    file.progress = percent ;
  }

  private _onUploadDone(file: NtPicture) {
    file.status = NtUploadStatus.SUCCESS;
  }
}
