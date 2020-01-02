import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStarterComponent } from './getting-starter.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GettingStarterComponent }
    ])
  ],
  declarations: [GettingStarterComponent]
})
export class GettingStarterModule { }
