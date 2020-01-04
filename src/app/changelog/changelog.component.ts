import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  template: `
    <nt-markdown [data]="newChangelog"></nt-markdown>
    <nt-markdown [data]="oldChangelog"></nt-markdown>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-changelog nt-changelog-timeline wrapper'
  },
  styleUrls: ['changelog.component.scss']
})
export class ChangelogComponent {
  newChangelog = require('!!raw-loader!CHANGELOG.md').default;
  oldChangelog = require('!!raw-loader!CHANGELOG_OLD.md').default;
}
