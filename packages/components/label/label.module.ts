import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtLabelComponent } from './label.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NtLabelComponent],
  exports: [NtLabelComponent]
})
export class NtLabelModule { }
