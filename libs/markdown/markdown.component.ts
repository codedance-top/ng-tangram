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

import { NtMarkdownEngine } from './markdown-engine';

@Component({
  selector: 'nt-markdown, [nt-markdown]',
  template: '<div [innerHtml]="markdown"></div>',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'nt-markdown'
  }
})
export class NtMarkdownComponent implements OnChanges {

  private _path: string;
  private _data: string;
  private _md: any;
  private _ext: string;

  changeLog: string[] = [];

  markdown: string;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _markdownService: NtMarkdownEngine,
    private _elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    const pathChange = changes.path;
    const dataChange = changes.data;
    if (pathChange && !pathChange.firstChange) {
      this.onPathChange();
    }
    if (dataChange && !dataChange.firstChange) {
      this.onDataChange();
    }
  }

  @Input()
  get path() { return this._path; }
  set path(value: string) { this._path = value || ''; }

  @Input()
  get data() { return this._data; }
  set data(value: string) { this._data = value; }

  // on input
  onDataChange() {
    if (this.data) {
      this._elementRef.nativeElement.innerHTML = this._markdownService.compile(this.data);
    } else {
      this._elementRef.nativeElement.innerHTML = '';
    }
    this.postpare();
  }

  /**
   *  After view init
   */
  ngAfterViewInit() {
    if (this.path) {
      this.onPathChange();
    } else {
      this.onDataChange();
    }
  }

  /**
   * get remote conent;
   */
  onPathChange() {
    if (this.path) {
      this._ext = this.path && this.path.split('.').splice(-1).join();
      this._markdownService.getContent(this.path)
        .subscribe(
          data => {
            this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
            this._elementRef.nativeElement.innerHTML = this._markdownService.compile(this.prepare(this._md));
            this.postpare();
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
  prepare(raw: string) {
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

  postpare() {
    // 判断是否是浏览器执行，如果是：增加代码高亮
    typeof highlightAll === 'function'
      && isPlatformBrowser(this._platformId)
      && highlightAll(false);
  }

  /**
   * Trim left whitespace
   */
  private _trimLeft(line: string) {
    return line.replace(/^\s+|\s+$/g, '');
  }
}
