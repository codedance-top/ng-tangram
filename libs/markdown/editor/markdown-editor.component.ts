import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/mode/gfm/gfm';

import { EditorFromTextArea, fromTextArea } from 'codemirror';
import { Subject, Subscription } from 'rxjs';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn } from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { commands } from './commands';
import { NtMarkdownEditorConfig, NT_MARKDOWN_EDITOR_CONFIG } from './markdown-editor-config';
import {
  DEFAULT_MARKDOWN_EDITOR_ICONS,
  NT_MARKDOWN_EDITOR_ICONS,
  NtMarkdownEditorIcons
} from './markdown-editor-icons';

// TODO: 将来会在 components/core 支持
interface SyncScrollElement extends HTMLElement {
  previousScrollY: number;
  callback: (event: Event) => void;
}

// TODO: 将来会在 components/core 支持
interface SyncScrollEvent {
  scrollY: number;
  rateY: number;
  owner: SyncScrollElement;
}

const DEFAULT_MIN_ROWS = 10, DEFAULT_MAX_ROWS = 20,
  MIN_ROWS_VALUE = 1, MAX_ROWS_VALUE = 100;

@Component({
  selector: 'nt-markdown-editor',
  templateUrl: 'markdown-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NtFormFieldControl, useExisting: NtMarkdownEditorComponent }
  ],
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.15))
    ])
  ],
  host: {
    'class': 'nt-markdown-editor nt-form-control',
    '[class.focus]': 'focused',
    '[class.fill-screen]': 'fillScreen'
  }
})
export class NtMarkdownEditorComponent extends NtFormFieldControl<string>
  implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {

  private readonly _destroy = new Subject<void>();

  private _syncScrollElements: SyncScrollElement[] = [];

  private _syncScrollEvent = new Subject<SyncScrollEvent>();

  private _syncScrollSubscription: Subscription;

  private _value = '';

  fillScreen = false;

  previewMode = false;

  instance: EditorFromTextArea;

  config: NtMarkdownEditorConfig;

  icons: NtMarkdownEditorIcons;

  activeActions: string[] = [];

  activeActionsSnapshot: string[] = [];

  _minHeight: string = `100px`;

  _maxHeight: string = `100px`;

  @ViewChild('editor', { static: true }) editor: ElementRef;

  @ViewChild('markdown', { static: false, read: ElementRef }) markdown: ElementRef;

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
    this._maxRows = newValue > MAX_ROWS_VALUE ? MAX_ROWS_VALUE : newValue;
  }

  private _theme: string = 'default';

  @Input()
  get theme(): string { return this._theme; }
  set theme(value: string) { this._theme = value; }

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
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Inject(NT_MARKDOWN_EDITOR_ICONS) _icons: NtMarkdownEditorIcons,
    @Optional() @Inject(NT_MARKDOWN_EDITOR_CONFIG) _config: NtMarkdownEditorConfig) {


    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.config = { ... new NtMarkdownEditorConfig(), ..._config };

    this.icons = { ...DEFAULT_MARKDOWN_EDITOR_ICONS, ..._icons };
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._codeMirrorInit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const rowChanges = changes.minRows || changes.maxRows;
    if (rowChanges && !rowChanges.firstChange) {
      this._setEditorHeightRange();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this._unsubscribeScrolls();
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
      this._actionMatches();
      setTimeout(() => {
        this.instance.refresh();
        this.previewMode ? this._subscribeScrolls() : this._unsubscribeScrolls();
      });

    } else if (type === 'help') {
      window.open('https://guides.github.com/features/mastering-markdown/', '_blank');
    } else {
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
    this.instance.getDoc().undo();
  }

  redo() {
    this.instance.getDoc().redo();
  }

  changeScreenFilled(fillScreen: boolean) {
    this.fillScreen = fillScreen;
    this._setEditorHeightRange();
  }

  // 开始订阅滚动条同步事件
  private _subscribeScrolls() {

    const callback = (event: Event) => {
      const element = event.target as SyncScrollElement;
      const scrollYUpdated = element.scrollTop !== element.previousScrollY;
      if (scrollYUpdated) {
        this._scrollTo(element);
      }
      element.previousScrollY = element.scrollTop;
    };

    const editorScrollElement = this.instance.getScrollerElement() as SyncScrollElement;
    this._syncScrollElements.push(editorScrollElement, this.markdown.nativeElement);
    this._syncScrollElements.forEach(element =>
      element.addEventListener('scroll', element.callback = callback)
    );

    // 订阅同步滚动事件
    this._syncScrollSubscription = this._syncScrollEvent.subscribe((event: SyncScrollEvent) => {
      this._syncScrollElements
        .filter(element => event.owner !== element)
        .forEach(element => {
          scrollY = element.previousScrollY = Math.round(event.rateY * (element.scrollHeight - element.clientHeight));
          if (Math.round(element.scrollTop - scrollY)) {
            element.scrollTop = scrollY;
          }
        });
    });

    this._scrollTo(editorScrollElement);
  }

  // 取消订阅滚动条同步事件
  private _unsubscribeScrolls() {
    if (this._syncScrollSubscription && !this._syncScrollSubscription.closed) {
      this._syncScrollSubscription.unsubscribe();
    }
    if (this._syncScrollElements) {
      this._syncScrollElements.forEach(element =>
        element.removeEventListener('scroll', element.callback)
      );
      this._syncScrollElements = [];
    }
  }

  private _scrollTo(element: SyncScrollElement) {
    this._syncScrollEvent.next({
      scrollY: element.scrollTop,
      rateY: element.scrollTop / (element.scrollHeight - element.clientHeight),
      owner: element
    });
  }

  private _codeMirrorInit() {
    if (typeof fromTextArea === 'function') {
      this.editor.nativeElement.value = this.value;
      this.instance = fromTextArea(this.editor.nativeElement, {
        mode: 'gfm',
        lineWrapping: true,
        theme: this.theme || 'default',
        placeholder: this.placeholder,
        extraKeys: { Enter: 'newlineAndIndentContinueMarkdownList' }
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
        this._changeDetectorRef.markForCheck();
      });

      Promise.resolve().then(() => this.instance.refresh());
    }
  }

  private _onCodeMirrorChange(instance: EditorFromTextArea) {
    this._actionMatches();
    this._value = instance.getValue();
    this._onChange(this._value);
    this._onTouched();
    this._changeDetectorRef.markForCheck();
  }

  private _onCodeMirrorCursorActivity() {
    this._actionMatches();
    this._changeDetectorRef.markForCheck();
  }

  private _onCodeMirrorFocus() {
    this._focused = true;
    this._changeDetectorRef.markForCheck();
  }

  private _onCodeMirrorBlur() {
    this._focused = false;
    this._changeDetectorRef.markForCheck();
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
    if (range.match(/^\>+/gm)) { this.activeActions.push('quote'); }
    if (this.previewMode) { this.activeActions.push('preview'); }
  }

  /**
   * 以文本行数来计算输入窗口的高度。
   */
  private _setEditorHeightRange() {
    if (isPlatformBrowser(this.platformId) && !!this.instance) {
      const scrollElement = this.instance.getScrollerElement();
      const style = window.getComputedStyle(scrollElement);
      if (this.fillScreen) {
        this._minHeight = `100%`;
        this._maxHeight = `100%`;
        this._renderer.setStyle(scrollElement, 'min-height', this._minHeight);
        this._renderer.setStyle(scrollElement, 'max-height', this._maxHeight);
      } else if (style && style.lineHeight) {
        const lineHeight = parseFloat(style.lineHeight.replace('px', ''));
        this._minHeight = `${this.minRows * lineHeight}px`;
        this._maxHeight = `${this.maxRows * lineHeight}px`;
        this._renderer.setStyle(scrollElement, 'min-height', this._minHeight);
        this._renderer.setStyle(scrollElement, 'max-height', this._maxHeight);
      }
    }
  }
}
