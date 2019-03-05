import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/edit/continuelist';
import 'codemirror';

// const { fromTextArea, EditorFromTextArea } = require('codemirror');

import * as CodeMirror from 'codemirror';
import { Subject } from 'rxjs';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  Component, ElementRef, Input, OnDestroy, Optional, Self, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn } from '@ng-tangram/animate/fading';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { commands } from './commands';
import { NtMarkdownEditorConfig } from './markdown-editor-config';

@Component({
  selector: 'nt-markdown-editor',
  templateUrl: 'markdown-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtMarkdownEditorComponent }
  ],
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.15))
    ])
  ],
  host: {
    'class': 'nt-markdown-editor',
    '[class.focus]': 'focused'
  }
})
export class NtMarkdownEditorComponent extends NtFormFieldControl<string> implements ControlValueAccessor, OnDestroy {

  private readonly _destroy = new Subject<void>();

  private _value = '';

  previewMode = false;

  instance: CodeMirror.EditorFromTextArea;

  config: NtMarkdownEditorConfig = new NtMarkdownEditorConfig();

  activeActions: string[] = [];

  activeActionsSnapshot: string[] = [];

  @ViewChild('editor') editor: ElementRef;

  @Input()
  set value(value: string) {
    this._value = value;
    if (this.instance) {
      this.instance.setValue(value);
    }
  }
  get value() { return this._value; }

  get empty() { return !this.value; }

  private _focused = false;

  get focused() { return this._focused; }

  @Input() placeholder = '';

  private _disabled = false;

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  private _required = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  private _width: number;

  @Input()
  get width(): number { return this._width; }
  set width(value: number) {
    this._width = coerceNumberProperty(value) || 0;
    if (this.instance) {
      this.instance.setSize(this.width, this.height);
    }
  }

  private _height: number;

  @Input()
  get height(): number { return this._height; }
  set height(value: number) {
    this._height = coerceNumberProperty(value) || 0;
    if (this.instance) {
      this.instance.setSize(this.width, this.height);
    }
  }

  get history() {
    if (this.instance) {
      const doc = this.instance.getDoc();
      return doc.historySize();
    }
    return { undo: 0, redo: 0 };
  }

  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit() {
    this._codeMirrorInit();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  focus() {
    if (!this.disabled) {
      this.instance.focus();
    }
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  execCommand(type: string) {
    if (type === 'preview') {
      this.previewMode = !this.previewMode;
      if (this.previewMode) {
        this.activeActionsSnapshot = this.activeActions;
        this.activeActions = ['preview'];
      } else {
        this.activeActions = this.activeActionsSnapshot;
      }
    } else if (type === 'help') {
      window.open('https://guides.github.com/features/mastering-markdown/', '_blank');
    } else if (!this.previewMode) {
      const activeted = this.activeActions.indexOf(type) > -1;
      const doc = this.instance.getDoc();
      const start = doc.getCursor('start');
      const end = doc.getCursor('end');

      const multiple = end.line - start.line > 0;
      const command = commands[type];
      command && command(doc, activeted, multiple);
      this.instance.save();
      this.instance.focus();
    }
  }

  undo() {
    if (!this.previewMode) {
      const doc = this.instance.getDoc();
      doc.undo();
    }
  }

  redo() {
    if (!this.previewMode) {
      const doc = this.instance.getDoc();
      doc.redo();
    }
  }

  private _codeMirrorInit() {
    this.editor.nativeElement.value = this.value;
    this.instance = CodeMirror.fromTextArea(this.editor.nativeElement, {
      mode: 'gfm',
      lineWrapping: true,
      theme: "default",
      placeholder: this.placeholder,
      extraKeys: { "Enter": "newlineAndIndentContinueMarkdownList" }
    });

    this.instance.setSize(this.width, this.height);

    this.instance.on('change', this._onCodeMirrorChange.bind(this));
    this.instance.on('cursorActivity', this._onCodeMirrorCursorActivity.bind(this));
    this.instance.on('focus', this._onCodeMirrorFocus.bind(this));
    this.instance.on('blur', this._onCodeMirrorBlur.bind(this));

    this._destroy.subscribe(() => {
      this.instance.off('change', this._onCodeMirrorChange);
      this.instance.off('cursorActivity', this._onCodeMirrorCursorActivity);
      this.instance.off('focus', this._onCodeMirrorFocus);
      this.instance.off('blur', this._onCodeMirrorBlur);
      this.instance.toTextArea();
      // this.instance = null;
    });

    Promise.resolve().then(() => this.instance.refresh());
  }

  private _onCodeMirrorChange(instance: CodeMirror.EditorFromTextArea) {
    this._actionMatches();
    this._value = instance.getValue();
    this._onChange(this._value);
    this._onTouched();
  }

  private _onCodeMirrorCursorActivity() {
    this._actionMatches();
  }

  private _onCodeMirrorFocus() {
    this._focused = true;
  }

  private _onCodeMirrorBlur() {
    this._focused = false;
  }

  private _actionMatches() {
    const doc = this.instance.getDoc();
    const start = doc.getCursor('start');
    const end = doc.getCursor('end');
    const range = doc.getRange({ line: start.line, ch: 0 }, end);

    this.activeActions = [];

    if (range.match(/^#\s/gm)) { this.activeActions.push('h1'); }
    if (range.match(/^#{2}\s/gm)) { this.activeActions.push('h2'); }
    if (range.match(/^#{3}\s/gm)) { this.activeActions.push('h3'); }
    if (range.match(/^#{4}\s/gm)) { this.activeActions.push('h4'); }
    if (range.match(/^#{5}\s/gm)) { this.activeActions.push('h5'); }
    if (range.match(/^#{6}\s/gm)) { this.activeActions.push('h6'); }
    if (range.match(/^[*\-+]\s/gm)) { this.activeActions.push('ul'); }
    if (range.match(/^\d+\.\s+/gm)) { this.activeActions.push('ol'); }
  }
}
