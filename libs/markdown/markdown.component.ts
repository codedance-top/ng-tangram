import { highlightAll } from 'prismjs';

import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { NT_MARKDOWN_ENGINE, NtMarkdownEngine } from './markdown-engine';

@Component({
  selector: 'nt-markdown, [nt-markdown]',
  template: '',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'nt-markdown'
  }
})
export class NtMarkdownComponent implements OnChanges {

  private _ext: string;

  private _path: string;

  @Input()
  get path() { return this._path; }
  set path(value: string) { this._path = value || ''; }

  private _data: string;

  @Input()
  get data() { return this._data; }
  set data(value: string) { this._data = value; }

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Inject(NT_MARKDOWN_ENGINE) private _markdownEngine: NtMarkdownEngine,
    private _elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    const pathChange = changes.path;
    const dataChange = changes.data;
    if (pathChange && !pathChange.firstChange) {
      this._pathChange();
    }
    if (dataChange && !dataChange.firstChange) {
      this._dataChange();
    }
  }

  /*
   *  After view init
   */
  ngAfterViewInit() {
    if (this.path) {
      this._pathChange();
    } else {
      this._dataChange();
    }
  }

  // on input
  private _dataChange() {
    if (this.data) {
      this._markdownEngine.compile(this.data).subscribe(
        markdown => this._setMarkdownHtml(markdown)
      );
    } else {
      this._setMarkdownHtml('');
    }
  }

  /**
   * get remote conent;
   */
  private _pathChange() {
    if (this.path) {
      this._ext = this.path && this.path.split('.').splice(-1).join();
      this._markdownEngine.getContent(this.path).subscribe(
        content => {
          content = this._ext !== 'md' ? ['```', `${this._ext}\n${content}\n`, '```'].join() : content;
          this._markdownEngine.compile(this._prepare(content)).subscribe(
            markdown => this._setMarkdownHtml(markdown)
          );
        },
        error => this._handleError(error)
      );
    }
  }

  /**
   * catch http error
   */
  private _handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  /**
   * Prepare string
   */
  private _prepare(raw: string) {
    if (!raw) {
      return '';
    }
    if (this._ext === 'md' || !this.path) {
      let isCodeBlock = false;
      return raw.split('\n').map((line: string) => {
        if (this._trimLeft(line).substring(0, 3) === "```") {
          isCodeBlock = !isCodeBlock;
        }
        return isCodeBlock ? line : line.trim();
      }).join('\n');
    }
    return raw.replace(/\"/g, '\'');
  }

  private _postpare() {
    // 判断是否是浏览器执行，如果是：增加代码高亮
    if (isPlatformBrowser(this._platformId)) {
      highlightAll(false);
    }
  }

  private _setMarkdownHtml(markdown: string) {
    this._elementRef.nativeElement.innerHTML = markdown;
    this._postpare();
  }

  /**
   * Trim left whitespace
   */
  private _trimLeft(line: string) {
    return line.replace(/^\s+|\s+$/g, '');
  }
}
