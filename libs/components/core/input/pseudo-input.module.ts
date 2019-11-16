

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtPseudoCaretComponent } from './pseudo-caret.component';
import { NtPseudoInputComponent } from './pseudo-input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NtPseudoInputComponent,
    NtPseudoCaretComponent
  ],
  exports: [
    NtPseudoInputComponent,
    NtPseudoCaretComponent
  ]
})
export class NtPseudoInputModule { }
