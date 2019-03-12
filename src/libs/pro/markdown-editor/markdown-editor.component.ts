import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/edit/continuelist';

import { EditorFromTextArea, fromTextArea } from 'codemirror';
import { Subject } from 'rxjs';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import {
  Component, ElementRef, Inject, Input, OnChanges, OnDestroy, Optional, PLATFORM_ID, Renderer2,
  Self, SimpleChanges, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn } from '@ng-tangram/animate/fading';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { commands } from './commands';
import { NtMarkdownEditorConfig } from './markdown-editor-config';
import { NT_MARKDOWN_EDITOR_ICONS, NtMarkdownEditorIcons } from './markdown-editor-icons';

const DEFAULT_MIN_ROWS = 10, DEFAULT_MAX_ROWS = 20,
  MIN_ROWS_VALUE = 1, MAX_ROWS_VALUE = 100;

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
export class NtMarkdownEditorComponent extends NtFormFieldControl<string> implements ControlValueAccessor, OnChanges, OnDestroy {

  private readonly _destroy = new Subject<void>();

  private _value = '';

  previewMode = false;

  instance: EditorFromTextArea;

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

  private _minRows: number = DEFAULT_MIN_ROWS;

  @Input()
  get minRows(): number { return this._minRows; }
  set minRows(value: number) {
    const newValue = coerceNumberProperty(value) || 0;
    this._minRows = newValue < MIN_ROWS_VALUE ? MIN_ROWS_VALUE : newValue;
  }

  private _maxRows: number = DEFAULT_MAX_ROWS;

  @Input()
  get maxRows(): number { return this._maxRows; }
  set maxRows(value: number) {
    const newValue = coerceNumberProperty(value) || 0;
    this._maxRows = newValue < MAX_ROWS_VALUE ? MAX_ROWS_VALUE : newValue;
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

  constructor(
    private _renderer: Renderer2,
    @Self() @Optional() public ngControl: NgControl,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(NT_MARKDOWN_EDITOR_ICONS) public icons: NtMarkdownEditorIcons) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    /** codemirror 在服务器环境下不支持以 es6 模块的方式导入，因此需要以动态加载的方式来处理。 */
    // if (isPlatformBrowser(this.platformId) && !codeMirrorLoaded) {
    //   fromTextArea = require('codemirror').fromTextArea;
    //   require('codemirror/mode/gfm/gfm');
    //   require('codemirror/addon/edit/continuelist');
    //   codeMirrorLoaded = true;
    // }
  }

  ngAfterViewInit() {
    this._codeMirrorInit();
  }


  ngOnChanges(changes: SimpleChanges) {
    const change = changes.minRows || changes.maxRows;
    if (change && !change.firstChange) {
      this._setEditorHeightRange();
    }
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
    if (typeof fromTextArea === 'function') {
      this.editor.nativeElement.value = this.value;
      this.instance = fromTextArea(this.editor.nativeElement, {
        mode: 'gfm',
        lineWrapping: true,
        theme: "default",
        placeholder: this.placeholder,
        extraKeys: { "Enter": "newlineAndIndentContinueMarkdownList" }
      });

      this._setEditorHeightRange();

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
      });

      Promise.resolve().then(() => this.instance.refresh());
    }
  }

  private _onCodeMirrorChange(instance: EditorFromTextArea) {
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

  /**
   * 以文本行数来计算输入窗口的高度。
   */
  private _setEditorHeightRange() {
    if (isPlatformBrowser(this.platformId) && !!this.instance) {
      const scrollElement = this.instance.getScrollerElement();
      const style = window.getComputedStyle(scrollElement);
      if (style && style.lineHeight) {
        const lineHeight = parseFloat(style.lineHeight.replace('px', ''));
        this._renderer.setStyle(scrollElement, 'min-height', `${this.minRows * lineHeight}px`);
        this._renderer.setStyle(scrollElement, 'max-height', `${this.maxRows * lineHeight}px`);
      }
    }
  }
}
