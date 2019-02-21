
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtBadgeModule } from '@ng-tangram/components/badge';
import { NtIconModule } from '@ng-tangram/components/icon';

import { BadgeDocumentComponent } from './badge.component';
import { ExampleBadgeBasicComponent } from './examples/basic';
import { ExampleBadgeIconComponent } from './examples/icon';
import { ExampleBadgeColorsComponent } from './examples/colors';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtBadgeModule,
    NtIconModule,
    RouterModule.forChild([
      { path: '', component: BadgeDocumentComponent }
    ])],
  declarations: [BadgeDocumentComponent, ExampleBadgeBasicComponent, ExampleBadgeIconComponent, ExampleBadgeColorsComponent],
})
export class BadgeDocumentModule { }
