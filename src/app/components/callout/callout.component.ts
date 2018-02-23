import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Injectable } from '@angular/core';

@Component({
  selector: 'nt-callout-document',
  templateUrl: 'callout.component.md'
})
export class CalloutDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  colorCode = require('!!raw-loader!./demos/color');
  reactivesCode = require('!!raw-loader!./demos/reactives');
  sizeCode = require('!!raw-loader!./demos/size');
  eventCode = require('!!raw-loader!./demos/event');
}
