import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStarterComponent } from './getting-starter.component';
import { RouterModule } from '@angular/router';
import { NtMarkdownModule } from '@ng-tangram/markdown';

@NgModule({
  imports: [
    CommonModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: GettingStarterComponent }
    ])
  ],
  declarations: [GettingStarterComponent]
})
export class GettingStarterModule { }
