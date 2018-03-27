import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-callout-basic',
  template: `
    <nt-callout>内容</nt-callout>
    <nt-callout title="标题">内容</nt-callout>
  `
})
export class DemoBasicCalloutComponent { }
