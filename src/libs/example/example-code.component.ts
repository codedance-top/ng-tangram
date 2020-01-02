import { highlightAll } from 'prismjs';

import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nt-example-code',
  template: `
    <span class="nt-example-code-shown"
      (click)="shown=!shown"
      [nt-tooltip]="shown ? '收起代码' : '展开代码'">
      <i class="icon fab fa-angular" [class.visible]="shown"></i>代码
    </span>
    <pre class="code-container language-{{lang}}">
      <code class="language-{{lang}}">{{code}}</code>
    </pre>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-code',
    '[class.shown]': 'shown'
  }
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
