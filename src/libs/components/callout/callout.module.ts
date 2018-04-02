import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtIconModule } from '../icon';
import { NtCalloutComponent } from './callout.component';

@NgModule({
  imports: [CommonModule, NtIconModule],
  exports: [NtCalloutComponent],
  declarations: [NtCalloutComponent],
})
export class NtCalloutModule { }
