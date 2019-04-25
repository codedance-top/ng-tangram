import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { getExtension } from 'mime';
import { transition, trigger } from '@angular/animations';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { HttpProgressEvent } from '@angular/common/http';
import {
    Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output, Self, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeOut } from '@ng-tangram/animate/fading';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import {
    NT_UPLOAD_HANDLER, NtFileAcceptError, NtFileSizeError, NtFileUploadError, NtUpload,
    NtUploadControl, NtUploadControlError, NtUploadFile, NtUploadHandler, NtUploadStatus
} from '@ng-tangram/components/upload';

import { NT_FILE_EXTENSIONS, NT_FILE_ICONS, NtFileIcons } from './file-icons';

let uniqueId = 0;

export class NtFile extends NtUploadFile {
  id: string = `nt-file-${uniqueId++}`;
  progress?: number;
  uploader?: Subscription;
}

@Component({
  selector: 'nt-file',
  templateUrl: 'file.component.html',
  host: {
    'class': 'nt-file'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtFileComponent }
  ],
  animations: [
    trigger('fadeOut', [
      transition('* => void', fadeOut(.3))
    ])
  ]
})
export class NtFileComponent extends NtUploadControl<NtFile> implements OnInit, ControlValueAccessor {

  private readonly _destroy = new Subject<void>();

  private _disabled = false;
  private _required = false;
  private _autoupload = true;
  private _value: NtFile[] = [];
  private _maxFiles = 1;
  private _maxSize = 5;
  private _accept = ['*'];

  files: NtFile[] = [];

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
      this._accept = value.replace(' ', '').split(',');
    } else {
      this._accept = coerceArray(value);
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

  @Output() error = new EventEmitter<NtUploadControlError>();

  @Output() remove = new EventEmitter<NtFile>();

  constructor(
    @Inject(NT_UPLOAD_HANDLER) uploader: NtUploadHandler,
    @Self() @Optional() ngControl: NgControl,
    @Inject(NT_FILE_ICONS) public icons: NtFileIcons) {
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

  _fileChanged() {

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

      let ntFile = new NtFile(file.name, file.size, file.type);

      this.files.push(ntFile);

      const handlers = {
        begin: () => this._onUploadBegin(ntFile),
        progress: event => this._onUploadProgress(event, ntFile),
        done: () => this._onUploadDone(ntFile)
      };

      if (this.autoupload) {

        ntFile.uploader = this._uploader
          .upload(this.url, file, this.name, handlers)
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

  removeFile(file: NtFile) {
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

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  setValue(value: NtFile[]) {
    if (value) {
      this._value.length = 0;
      this._value.push(...value);
      this.files.length = 0;
      this.files.push(...this._value);
    }
  }

  getFileIcon(file: NtFile) {
    const extension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
    const icon = NT_FILE_EXTENSIONS[extension] || 'default';
    return this.icons[icon];
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

  private _onUploadBegin(file: NtFile) {
    file.status = NtUploadStatus.SENDING;
  }

  private _onUploadProgress(event: HttpProgressEvent, file: NtFile) {
    if (event.total && event.total > 0) {
      file.progress = Math.round(event.loaded / event.total * 100);
    }
  }

  private _onUploadDone(file: NtFile) {
    file.status = NtUploadStatus.SUCCESS;
  }
}
