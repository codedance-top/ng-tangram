import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NT_MARKDOWN_ENGINE, NtMarkdownEngine } from '@ng-tangram/markdown';

@Component({
  selector: 'nt-example-legend',
  template: `
    <div class="nt-example-legend-title" *ngIf="title">{{title}}</div>
    <div class="nt-example-legend-content" #content>
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-example-legend'
  }
})
export class NtExampleLegendComponent implements AfterContentInit {

  @Input() title: string;

  @ViewChild('content', { static: true, read: ElementRef }) content: ElementRef;

  constructor(
    @Inject(NT_MARKDOWN_ENGINE) private _markdownEngine: NtMarkdownEngine) {

  }

  ngAfterContentInit() {
    this._compileContent();
  }

  private _compileContent() {
    const contentElement = this.content.nativeElement;
    this._markdownEngine
      .compile(contentElement.innerHTML)
      .subscribe(result => contentElement.innerHTML = result);
  }
}
