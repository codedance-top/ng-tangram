import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ntTreeNodeToggle]',
  providers: [
    { provide: CdkTreeNodeToggle, useExisting: NtTreeNodeToggleDirective }
  ],
  inputs: ['recursive: ntTreeNodeToggleRecursive']
})
export class NtTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> { }
