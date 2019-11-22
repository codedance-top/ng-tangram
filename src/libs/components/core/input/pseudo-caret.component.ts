
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-pseudo-caret',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-pseudo-caret'
  }
})
export class NtPseudoCaretComponent { }
