
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtCheckboxComponent } from './checkbox.component';
import { NtCheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtCheckboxComponent, NtCheckboxGroupComponent],
  declarations: [NtCheckboxComponent, NtCheckboxGroupComponent],
})
export class NtCheckboxModule { }
