import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  template: `
    <nt-markdown [data]="changelog"></nt-markdown>
    <nt-markdown [data]="oldChangelog"></nt-markdown>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-changelog'
  },
  styles: [`
    .nt-changelog {
      display: block;
      padding: 20px 30px;
    }

    .nt-changelog h1,
    .nt-changelog h2,
    .nt-changelog h3,
    .nt-changelog h4,
    .nt-changelog h5,
    .nt-changelog h6 {
      margin-top: 1em;
    }
  `]
})
export class ChangelogComponent {
  changelog = require('!!raw-loader!CHANGELOG.md').default;
  oldChangelog = require('!!raw-loader!CHANGELOG_OLD.md').default;
}
