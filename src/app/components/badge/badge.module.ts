
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtBadgeModule } from '@ng-tangram/components/badge';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { BadgeDocumentComponent } from './badge.component';
import { ExampleBadgeBasicComponent } from './examples/basic';
import { ExampleBadgeColorsComponent } from './examples/colors';
import { ExampleBadgeIconComponent } from './examples/icon';

@NgModule({
  imports: [
    CommonModule,
    NtMarkdownModule,
    NtExampleModule,
    NtBadgeModule,
    RouterModule.forChild([
      { path: '', component: BadgeDocumentComponent }
    ])
  ],
  declarations: [
    BadgeDocumentComponent,
    ExampleBadgeBasicComponent,
    ExampleBadgeColorsComponent,
    ExampleBadgeIconComponent
  ]
})
export class BadgeDocumentModule { }
