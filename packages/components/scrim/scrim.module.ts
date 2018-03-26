import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtScrimComponent } from './scrim.component';
import { NtScrimDirective } from './scrim.directive';

@NgModule({
  imports: [CommonModule],
  entryComponents: [NtScrimComponent],
  exports: [NtScrimComponent, NtScrimDirective],
  declarations: [NtScrimComponent, NtScrimDirective]
})
export class NtScrimModule { }
