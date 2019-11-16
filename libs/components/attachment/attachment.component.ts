import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  fadeOut,
  findCategoryByExtensions,
  findCategoryByFile,
  NT_UPLOAD_HANDLER,
  NtFileError,
  NtUploadHandler,
  NtUploadRef,
  NtUploadResult,
  NtUploadStatus
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import {
  DEFAULT_ATTACHMENT_ICONS,
  NT_ATTACHMENT_ICONS,
  NtAttachmentIcons
} from './attachment-icons';

let uniqueId = 0;

export class NtAttachmentRef<T> extends NtUploadRef<T> {

  category?: string;

  constructor(
    public file: File,
    public id: string = `nt-attachment-${uniqueId++}`
  ) {
    super(file, file.name, file.size);
    this.category = findCategoryByFile(file) || 'default';
  }
}

@Component({
  selector: 'nt-attachment, [nt-attachment]',
  templateUrl: 'attachment.component.html',
  host: {
    'class': 'nt-attachment',
    '[class.disabled]': 'disabled',
    '[class.readonly]': 'readonly'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtAttachmentComponent }
  ],
  animations: [
    trigger('fadeOut', [
      transition('* => void', fadeOut(.3))
    ])
  ]
})
export class NtAttachmentComponent<T> extends NtFormFieldControl<NtAttachmentRef<T>[]> implements OnInit, ControlValueAccessor {

  private readonly _destroy = new Subject<void>();

  _displayAttachmentRefs: NtAttachmentRef<T>[] = [];

  private _attachmentRefs: NtAttachmentRef<T>[] = [];

  get value() { return this._attachmentRefs; }

  private _disabled = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }

  private _readonly = false;

  @Input()
  get readonly() { return this._readonly; }
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }

  private _notriggle = false;

  @Input()
  get notriggle() { return this._notriggle; }
  set notriggle(value: boolean) { this._notriggle = coerceBooleanProperty(value); }

  private _required = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  private _accept = '*';

  @Input()
  set accept(value: string | Array<string>) {
    if (typeof value === 'string') {
      this._accept = value.replace(' ', '');
    } else {
      this._accept = value.join(',');
    }
  }
  get accept() { return this._accept; }

  private _multiple = true;

  @Input()
  get multiple() { return this._multiple; }
  set multiple(value: boolean) { this._multiple = coerceBooleanProperty(value); }

  private _

  private _limitSize = Number.MAX_VALUE;

  @Input()
  get limitSize() { return this._limitSize; }
  set limitSize(value: number) { this._limitSize = coerceNumberProperty(value, 5); }

  @Input() url: string = '';

  @Input() name: string = '';

  @Output() errors = new EventEmitter<NtFileError | NtFileError[]>();

  private _onChange: (value: any) => void = () => { };

  private _onTouched = () => { };

  constructor(
    @Inject(NT_UPLOAD_HANDLER) private _uploadHandler: NtUploadHandler,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Inject(NT_ATTACHMENT_ICONS) public icons: NtAttachmentIcons) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.icons = { ...DEFAULT_ATTACHMENT_ICONS, ...icons };
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.errors.complete();
  }

  writeValue(value: NtAttachmentRef<T>[]) {
    if (value) {
      value = this._initValueCategoies(value);
      this._attachmentRefs.splice(0, this._attachmentRefs.length, ...value);
      this._displayAttachmentRefs.splice(0, this._displayAttachmentRefs.length, ...value);
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

  _select(files: File[]) {

    const attachmentRefs = files.map(file => this._createAttachmentRef(file));

    this._displayAttachmentRefs.push(...attachmentRefs);

    this._onTouched && this._onTouched();
  }

  _remove(attachmentRef: NtAttachmentRef<T>) {

    if (this.disabled) { return; }

    this._removeAttachmentRef(attachmentRef);
    this._onChange(this.value);
  }

  private _createAttachmentRef(file: File) {

    const attachmentRef = new NtAttachmentRef<T>(file);

    attachmentRef.subscription = this._uploadHandler
      .upload<T>(this.url, attachmentRef)
      .pipe(takeUntil(this._destroy))
      .subscribe(result => this._resolveUploadedResult(attachmentRef, result));

    return attachmentRef;
  }

  private _removeAttachmentRef(attachmentRef: NtAttachmentRef<T>) {

    if (attachmentRef.subscription && !attachmentRef.subscription.closed) {
      attachmentRef.subscription.unsubscribe();
    }

    if (this._attachmentRefs.includes(attachmentRef)) {
      const index = this._attachmentRefs.indexOf(attachmentRef);
      this._attachmentRefs.splice(index, 1);
    }

    if (this._displayAttachmentRefs.includes(attachmentRef)) {
      const displayIndex = this._displayAttachmentRefs.indexOf(attachmentRef);
      this._displayAttachmentRefs.splice(displayIndex, 1);
    }
  }

  private _resolveUploadedResult(attachmentRef: NtAttachmentRef<T>, result: NtUploadResult<T>) {
    if (result.status === NtUploadStatus.SUCCESS) {
      attachmentRef.data = result.data;
      this._attachmentRefs.push(attachmentRef);
    } else {
      attachmentRef.status = NtUploadStatus.ERROR;
      attachmentRef.error = result.error;
      attachmentRef.progress = 100;
      this.errors.next(result.error);
    }
    this._onChange(this.value);
  }

  private _initValueCategoies(attachmentRefs: NtAttachmentRef<T>[]) {
    attachmentRefs.forEach(item => {
      item.category = findCategoryByExtensions(item.name) || 'default';
    });
    return attachmentRefs;
  }
}
