import { Component } from '@angular/core';

@Component({
  selector: 'nt-modal-body',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nt-modal-body'
  }
})
export class NtModalBodyComponent  { }
