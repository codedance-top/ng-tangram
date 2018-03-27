import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-callout-size',
  template: `
    <nt-callout size="small">小标题</nt-callout>
    <nt-callout size="medium">中等</nt-callout>
    <nt-callout size="large">大标题</nt-callout>
  `
})
export class DemoCalloutSizeComponent { }
