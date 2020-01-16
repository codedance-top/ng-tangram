import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ChangelogComponent } from './changelog.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../shared/header';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: ChangelogComponent }
    ])
  ],
  declarations: [ChangelogComponent]
})
export class ChangelogModule { }
