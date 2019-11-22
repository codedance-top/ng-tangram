import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-input-addon, [nt-input-addon]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-input-addon input-group-label'
  }
})
export class NtInputAddonComponent { }

