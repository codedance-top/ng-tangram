import { Directive } from '@angular/core';

@Directive({
  selector: 'table[ntTableResizable], nt-table[ntTableResizable]'
})
export class NtTableResizable {

  private _isNativeTable: boolean;

  constructor() { }
}
