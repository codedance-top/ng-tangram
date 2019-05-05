import { highlightAll } from 'prismjs';

import { isPlatformBrowser } from '@angular/common';
import {
  Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, Renderer2, ViewEncapsulation
} from '@angular/core';

import { NtMarkdownService } from './markdown.service';

@Component({
  selector: 'nt-markdown-block, [nt-markdown-block]',
  template: '<div [innerHtml]="markdown"></div>',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'nt-markdown-block'
  }
})
export class NtMarkdownBlockComponent implements OnInit, OnChanges {

  private _path: string;
  private _data: string;
  private _md: any;
  private _ext: string;

  changeLog: string[] = [];

  markdown: string;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _markdownService: NtMarkdownService,
    private _elementRef: ElementRef) { }

  ngOnInit() {
    this.markdown = this._markdownService.compile(this._data);
  }

  ngOnChanges() {

  }

  @Input()
  set path(value: string) {
    if (this._path = value || '') {
      this.onPathChange();
    }
  }

  @Input()
  set data(value: string) {
    if (this._data = value || '') {
      this.onDataChange(value);
    }
  }

  // on input
  onDataChange(data: string) {
    if (data) {
      this._elementRef.nativeElement.innerHTML = this._markdownService.compile(data);
    } else {
      this._elementRef.nativeElement.innerHTML = '';
    }
    this.postpare();
  }

  /**
   *  After view init
   */
  ngAfterViewInit() {
    if (this._path) {
      this.onPathChange();
    } else if (!this._data) {
      this.processRaw();
    }
  }

  processRaw() {
    this._md = this.prepare(this._elementRef.nativeElement.innerHTML);
    this._elementRef.nativeElement.innerHTML = this._markdownService.compile(this._md);
    this.postpare();
  }

  /**
   * get remote conent;
   */
  onPathChange() {
    this._ext = this._path && this._path.split('.').splice(-1).join();
    this._markdownService.getContent(this._path)
      .subscribe(data => {
        this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
        this._elementRef.nativeElement.innerHTML = this._markdownService.compile(this.prepare(this._md));
        this.postpare();
      },
      () => this._handleError);
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
