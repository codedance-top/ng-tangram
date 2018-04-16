import { Component } from '@angular/core';

@Component({
  selector: 'nt-modal-footer',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'nt-modal-footer'
  }
})
export class NtModalFooterComponent  { }
