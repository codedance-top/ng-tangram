import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Injectable } from '@angular/core';

@Component({
  selector: 'nt-callout-document',
  templateUrl: 'callout.component.md'
})
export class CalloutDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  colorCode = require('!!raw-loader!./examples/color');
  reactivesCode = require('!!raw-loader!./examples/reactives');
  sizeCode = require('!!raw-loader!./examples/size');
  eventCode = require('!!raw-loader!./examples/event');
  api = require('!!raw-loader!src/libs/components/callout/README.md');
}
