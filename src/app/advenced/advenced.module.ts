import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvencedComponent } from './advenced.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdvencedComponent }
    ])
  ],
  declarations: [AdvencedComponent]
})
export class AdvencedModule { }
