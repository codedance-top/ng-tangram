import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtButtonGroupComponent } from './button-group.component';
import { NtButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule],
  exports: [NtButtonComponent, NtButtonGroupComponent],
  declarations: [NtButtonComponent, NtButtonGroupComponent],
})
export class NtButtonModule { }
