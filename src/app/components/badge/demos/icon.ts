import { Component } from '@angular/core';

@Component({
  selector: 'demo-badge-icon',
  template: `
    <nt-badge><nt-ant-icon ntType="book"></nt-ant-icon></nt-badge>
    <nt-badge><nt-ant-icon ntType="hearto"></nt-ant-icon></nt-badge>
    <nt-badge><nt-ant-icon ntType="cloud"></nt-ant-icon></nt-badge>
  `
})
export class DemoBadgeIconComponent { }
