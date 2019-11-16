import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ChangelogComponent } from './changelog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: ChangelogComponent }
    ])
  ],
  declarations: [ChangelogComponent]
})
export class ChangelogModule { }
