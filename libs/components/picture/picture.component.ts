import loadImage from 'blueimp-load-image';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  fadeIn,
  fadeOut,
  NT_UPLOAD_HANDLER,
  NtFileError,
  NtUploadHandler,
  NtUploadRef,
  NtUploadResult,
  NtUploadStatus
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NtModal } from '@ng-tangram/components/modal';

import { DEFAULT_PICTURE_ICONS, NT_PICTURE_ICONS, NtPictureIcons } from './picture-icons';

/**
 * 压缩图片
 */
export function zipImage(file: File, option: any = { maxWidth: 1080, orientation: true }): Promise<any> {
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

export class NtPictureRef<T> extends NtUploadRef<T> {
  thumbnail: string;
  constructor(
    public file: File,
    public id: string = `nt-picture-${uniqueId++}`
  ) {
    super(file, file.name, file.size);
  }
}

@Component({
  selector: 'nt-picture',
  templateUrl: 'picture.component.html',
  host: {
    'class': 'nt-picture',
    '[class.disabled]': 'disabled',
    '[class.readonly]': 'readonly'
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
export class NtPictureComponent<T> extends NtFormFieldControl<NtPictureRef<T>[]> implements OnInit, ControlValueAccessor {

  private readonly _destroy = new Subject<void>();

  private _accept = NT_PICTURE_ACCEPTS.join(',');

  _displayPictureRefs: NtPictureRef<T>[] = [];

  private _pictureRefs: NtPictureRef<T>[] = [];

  get value() { return this._pictureRefs; }

  private _disabled = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }

  private _readonly = false;

  @Input()
  get readonly() { return this._readonly; }
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }

  private _notrigger = false;

  @Input()
  get notrigger() { return this._notrigger; }
  set notrigger(value: boolean) { this._notrigger = coerceBooleanProperty(value); }

  private _required = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  @Input()
  get accept() { return this._accept; }
  set accept(value: string | Array<string>) {
    if (typeof value === 'string') {
      if (value === '*') {
        this._accept = NT_PICTURE_ACCEPTS.join(',');
      } else {
        this._accept = value.replace(' ', '');
      }
    } else {
      this._accept = value.join(',');
    }
  }

  private _multiple = true;

  @Input()
  get multiple() { return this._multiple; }
  set multiple(value: boolean) { this._multiple = coerceBooleanProperty(value); }

  private _limitSize = Number.MAX_VALUE;

  @Input()
  get limitSize() { return this._limitSize; }
  set limitSize(value: number) { this._limitSize = coerceNumberProperty(value, 5); }

  @Input() url: string = '';

  @Input() name: string = '';

  @Input() shape: '' | 'circle' | 'square' = '';

  @ViewChild('previewTemplate', { static: true }) previewTemplate: TemplateRef<any>;

  @Output() errors = new EventEmitter<NtFileError>();

  private _onChange: (value: any) => void = () => { };

  private _onTouched = () => { };

  constructor(
    private _modal: NtModal,
    @Inject(NT_UPLOAD_HANDLER) private _uploadHandler: NtUploadHandler,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Inject(NT_PICTURE_ICONS) public icons: NtPictureIcons) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.icons = { ...DEFAULT_PICTURE_ICONS, ...icons };
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.errors.complete();
  }

  writeValue(value: NtPictureRef<T>[]) {
    if (value) {
      this._pictureRefs.splice(0, this._pictureRefs.length, ...value);
      this._displayPictureRefs.splice(0, this._displayPictureRefs.length, ...value);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  preview(pictureRef: NtPictureRef<T>) {
    this._modal.open(this.previewTemplate, {
      data: pictureRef,
      centerVertically: true,
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: 'auto',
      transparent: true
    });
  }

  _select(files: File[]) {

    const pictureRefs = files.map(file => this._createPictureRef(file));
    this._displayPictureRefs.push(...pictureRefs);
    this._onTouched && this._onTouched();
  }

  _remove(pictureRef: NtPictureRef<T>) {

    if (this.disabled) { return; }

    this._removePictureRef(pictureRef);
    this._onChange(this.value);
  }

  private _createPictureRef(file: File) {

    const pictureRef = new NtPictureRef<T>(file);

    zipImage(file).then(data => pictureRef.thumbnail = data.thumbnail);

    pictureRef.subscription = this._uploadHandler
      .upload<T>(this.url, pictureRef)
      .pipe(takeUntil(this._destroy))
      .subscribe(result => this._resolveUploadedResult(pictureRef, result));

    return pictureRef;
  }

  private _removePictureRef(pictureRef: NtPictureRef<T>) {

    if (pictureRef.subscription && !pictureRef.subscription.closed) {
      pictureRef.subscription.unsubscribe();
    }

    if (this._pictureRefs.includes(pictureRef)) {
      const index = this._pictureRefs.indexOf(pictureRef);
      this._pictureRefs.splice(index, 1);
    }

    if (this._displayPictureRefs.includes(pictureRef)) {
      const displayIndex = this._displayPictureRefs.indexOf(pictureRef);
      this._displayPictureRefs.splice(displayIndex, 1);
    }
  }

  private _resolveUploadedResult(pictureRef: NtPictureRef<T>, result: NtUploadResult<T>) {
    if (result.status === NtUploadStatus.SUCCESS) {
      pictureRef.data = result.data;
      this._pictureRefs.push(pictureRef);
    } else {
      pictureRef.status = NtUploadStatus.ERROR;
      pictureRef.error = result.error;
      pictureRef.progress = 100;
      this.errors.next(result.error);
    }
    this._onChange(this.value);
  }

  // private _coerceAccpetRange(array: Array<string>) {
  //   return array.filter(accept => NT_PICTURE_ACCEPTS.indexOf(accept) > -1);
  // }
}
