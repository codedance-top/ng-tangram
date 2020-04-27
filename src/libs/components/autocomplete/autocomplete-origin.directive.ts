import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ntAutocompleteOrigin]',
  exportAs: 'ntAutocompleteOrigin',
})
export class NtAutocompleteOriginDirective {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}
