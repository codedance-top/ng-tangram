import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtAntIconModule } from '../ant-icon/ant-icon.module';
import { NtCalloutComponent } from './callout.component';

@NgModule({
  imports: [CommonModule, NtAntIconModule],
  exports: [NtCalloutComponent],
  declarations: [NtCalloutComponent],
})
export class NtCalloutModule { }
