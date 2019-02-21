import { CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ntTreeNodeOutlet]',
  providers: [
    { provide: CdkTreeNodeOutlet, useExisting: NtTreeNodeOutletDirective }
  ]
})
export class NtTreeNodeOutletDirective implements CdkTreeNodeOutlet {
  constructor(public viewContainer: ViewContainerRef) { }
}
