import { highlightAll } from 'prismjs';

import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  PLATFORM_ID,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

export interface NtExampleCodeTabPaneParent {
  activeTab: string;
}

export const NT_EXAMPLE_CODE_PANEL_PARENT = new InjectionToken<NtExampleCodeTabPaneParent>('nt-example-code-panel-parent');

@Component({
  selector: 'nt-example-code-tabs-panel',
  template: `
    <pre class="code-container language-{{lang}}"><code class="language-{{lang}}">{{code}}</code></pre>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-code-tabs-panel',
    '[class.is-active]': 'parent.activeTab === title'
  },
})
export class NtExampleCodeTabsPanelComponent {

  private _title: string;

  @Input() code: string;

  @Input() lang: string;

  @Input()
  get title() { return this._title || this.lang; }
  set title(value: string) { this._title = value; }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(NT_EXAMPLE_CODE_PANEL_PARENT) public parent: NtExampleCodeTabPaneParent,
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
