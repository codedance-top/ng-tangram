import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-callout-size',
  template: `
    <nt-callout ntSize="small">小标题</nt-callout>
    <nt-callout ntSize="medium">中等</nt-callout>
    <nt-callout ntSize="large">大标题</nt-callout>
  `
})
export class DemoCalloutSizeComponent { }
