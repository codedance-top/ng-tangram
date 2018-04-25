import { state, transition, trigger } from '@angular/animations';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse, HttpResponseBase, HttpSentEvent
} from '@angular/common/http';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit,
  Optional, Output, Self, TemplateRef, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NtModal } from '@ng-tangram/components/modal';
import {
  NtFileAcceptError, NtFileSizeError, NtFileUploadError, NtUpload, NtUploadControl,
  NtUploadControlError, NtUploadFile, NtUploadHandler, NtUploadStatus
} from '@ng-tangram/components/upload';

import loadImage from 'blueimp-load-image';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { VIEWPORT_RULER_PROVIDER } from '@angular/cdk/scrolling';

// const loadImage = _loadImage;

/**
 * 压缩图片
 */
export function zipToImage(file: File, option: any): Promise<any> {
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

export const NtPictureAccepts = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];

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
    'class': 'nt-form-control nt-picture'
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
export class NtPictureComponent extends NtUploadControl<NtPicture> implements OnInit, ControlValueAccessor {

  private readonly _destroy = new Subject<void>();

  private _disabled = false;
  private _required = false;
  private _autoupload = true;
  private _value: NtPicture[] = [];
  private _maxFiles = 1;
  private _maxSize = 5;
  private _accept = NtPictureAccepts;

  files: NtPicture[] = [];

  @Input() url: string = '';

  @Input() name: string = '';

  get value() { return this._value; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  @Input()
  set accept(value: string | Array<string>) {
    if (typeof value === 'string') {
      if (value === '*') {
        this._accept = NtPictureAccepts;
      } else {
        this._accept = value.replace(' ', '').split(',').filter(accept => NtPictureAccepts.indexOf(accept) > -1);
      }
    } else {
      this._accept = coerceArray(value).filter(accept => NtPictureAccepts.indexOf(accept) > -1);
    }
  }
  get accept() { return this._accept; }

  @Input()
  set maxSize(value: number) { this._maxSize = coerceNumberProperty(value, 5); }
  get maxSize() { return this._maxSize; }

  @Input()
  set maxFiles(value: number) { this._maxFiles = coerceNumberProperty(value, 1); }
  get maxFiles() { return this._maxFiles; }

  @Input()
  set autoupload(value: boolean) { this._autoupload = coerceBooleanProperty(value); }
  get autoupload() { return this._autoupload; }

  @ViewChild('fileElement') fileElement: ElementRef;

  @ViewChild('previewTemplate') previewTemplate: TemplateRef<any>;

  @Output() error = new EventEmitter<NtUploadControlError>();

  @Output() remove = new EventEmitter<NtPicture>();

  constructor(
    private _modal: NtModal,
    uploader: NtUpload,
    @Self() @Optional() ngControl: NgControl) {
    super(uploader, ngControl);
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

  async _fileChanged() {

    const file = this.fileElement.nativeElement.files[0];
    if (file && this.files.length < this.maxFiles) {

      if (!this._fileSizeValid(file)) {
        this.error.next(new NtFileSizeError(file, this.maxSize * 1024 * 1024, `${this.maxSize}MB`));
        return;
      }

      if (!this._fileTypeValid(file)) {
        this.error.next(new NtFileAcceptError(file, file.type));
        return;
      }

      let ntFile = new NtPicture(file.name, file.size, file.type);

      let loadImageOptions = { maxWidth: 1080, orientation: true, canvas: true };
      const data = await zipToImage(file, loadImageOptions);
      ntFile.thumbnail = data.thumbnail;
      this.files.push(ntFile);

      const handlers = {
        begin: () => this._onUploadBegin(ntFile),
        progress: event => this._onUploadProgress(event, ntFile),
        done: () => this._onUploadDone(ntFile)
      };

      if (this.autoupload) {

        ntFile.uploader = this._uploader.upload(this.url, this._getFormData(file), handlers)
          .pipe(takeUntil(this._destroy))
          .subscribe(result => {
            if ((ntFile.status = result.status) === NtUploadStatus.SUCCESS) {
              ntFile.data = result.data;
              this._value.push(ntFile);
              this._onChange(this._value);
            }
          }, error => {
            ntFile.status = NtUploadStatus.ERROR;
            ntFile.error = error.statusText;
            ntFile.progress = 100;
            this.error.next(new NtFileUploadError(error.status, error.statusText));
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
    findex > -1 && this.files.splice(vindex, 1);

    this.remove.next(file);
    this._onChange(this._value);
  }

  preview(file: NtPicture) {
    const modal = this._modal.open(this.previewTemplate, {
      data: file,
      centerVertically: true,
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  setValue(value: NtPicture[]) {
    if (value) {
      this._value.length = 0;
      this._value.push(...value);
      this.files.length = 0;
      this.files.push(...this._value);
    }
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

  private _onUploadProgress(event: HttpProgressEvent, file: NtPicture) {
    if (event.total && event.total > 0) {
      file.progress = Math.round(event.loaded / event.total * 100);
    }
  }

  private _onUploadDone(file: NtPicture) {
    file.status = NtUploadStatus.SUCCESS;
  }
}
