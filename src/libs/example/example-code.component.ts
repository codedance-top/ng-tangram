import { highlight, highlightAll } from 'prismjs';

import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit, Component, ElementRef, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nt-example-code',
  template: `
    <span class="code-shown"
      (click)="shown=!shown"
      [nt-tooltip]="shown ? '收起代码' : '展开代码'"><nt-ant-icon [type]="!shown ? 'eyeo' : 'eye'"></nt-ant-icon>代码</span>
    <pre class="language-{{lang}}"><code class="language-{{lang}}">{{code}}</code></pre>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-code',
    '[class.shown]': 'shown'
  },
  styles: [`
    .nt-example-code {
      position: relative;
      display: block;
    }
    .nt-example-code .code-shown {
      position: absolute;
      top: -30px;
      right: 20px;
      cursor: pointer;
      color: #666;
    }
    .nt-example-code .code-shown nt-ant-icon {
      margin-right: 3px;
    }
    .nt-example-code pre {
      display: none;
      border-top: 1px solid #ccc;
      margin-top: 0;
      margin-bottom: 0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .nt-example-code.shown pre {
      display: block;
    }
  `]
})

export class NtExampleCodeComponent implements AfterContentInit, OnChanges {

  @Input() code: string;

  @Input() lang: string = 'typescript';

  shown = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef) { }

  ngAfterContentInit() {
    isPlatformBrowser(this.platformId) && Promise
      .resolve()
      .then(() => highlightAll(this.elementRef.nativeElement));
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.code || changes.lang;
    if (change && !change.firstChange && isPlatformBrowser(this.platformId)) {
      highlightAll(this.elementRef.nativeElement);
    }
  }
}
