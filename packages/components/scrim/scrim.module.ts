
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtScrimComponent } from './scrim.component';
import { NtScrimService } from './scrim.service';

@NgModule({
  imports: [CommonModule],
  exports: [NtScrimComponent],
  declarations: [NtScrimComponent],
  providers: [NtScrimService]
})
export class NtScrimModule { }
