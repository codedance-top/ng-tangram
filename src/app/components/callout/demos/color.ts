import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-callout-color',
  template: `
    <nt-callout>主要</nt-callout>
    <nt-callout ntColor="secondary">次要</nt-callout>
    <nt-callout ntColor="success">成功</nt-callout>
    <nt-callout ntColor="warning">警告</nt-callout>
    <nt-callout ntColor="alert">危险</nt-callout>
  `
})
export class DemoCalloutColorComponent { }
