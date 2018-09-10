import { Component, Input, AfterContentInit, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { highlightAll, highlight } from 'prismjs';

@Component({
  selector: 'nt-example-code',
  template: `
    <div class="example-code" [class.shown]="shown">
      <span class="code-shown"
        (click)="shown=!shown"
        [nt-tooltip]="shown ? '收起代码' : '展开代码'"><nt-ant-icon [type]="!shown ? 'eyeo' : 'eye'"></nt-ant-icon>代码</span>
      <pre class="language-{{lang}}"><code class="language-{{lang}}">{{code}}</code></pre>
    </div>
  `,
  styles: [`
    .example-code {
      position: relative;
    }
    .example-code .code-shown {
      position: absolute;
      top: -30px;
      right: 20px;
      cursor: pointer;
      color: #666;
    }
    .example-code .code-shown nt-ant-icon {
      margin-right: 3px;
    }
    .example-code pre {
      display: none;
      border-top: 1px solid #ccc;
      margin-top: 0;
      margin-bottom: 0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .example-code.shown pre {
      display: block;
    }
  `]
})

export class NtExampleCodeComponent implements AfterContentInit {

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
}
