
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtCheckboxGroupComponent } from './checkbox-group.component';
import { NtCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtCheckboxComponent, NtCheckboxGroupComponent],
  declarations: [NtCheckboxComponent, NtCheckboxGroupComponent],
})
export class NtCheckboxModule { }
