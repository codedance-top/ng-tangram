import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtButtonComponent } from './button.component';
import { NtButtonGroupComponent } from './button-group.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtButtonComponent, NtButtonGroupComponent],
  declarations: [NtButtonComponent, NtButtonGroupComponent],
})
export class NtButtonModule { }
