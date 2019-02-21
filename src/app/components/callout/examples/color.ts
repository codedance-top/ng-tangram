import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-callout-color',
  template: `
    <nt-callout>主要</nt-callout>
    <nt-callout color="secondary">次要</nt-callout>
    <nt-callout color="success">成功</nt-callout>
    <nt-callout color="warning">警告</nt-callout>
    <nt-callout color="alert">危险</nt-callout>
  `
})
export class ExampleCalloutColorComponent { }
