import { Component } from '@angular/core';

@Component({
  selector: 'nt-modal-header',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'nt-modal-header'
  }
})
export class NtModalHeaderComponent  { }
