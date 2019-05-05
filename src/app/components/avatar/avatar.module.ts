import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtAvatarModule } from '@ng-tangram/components/avatar';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { AvatarDocumentComponent } from './avatar.component';
import { DemoAvatarBasicComponent } from './examples/basic';
import { DemoAvatarShapeComponent } from './examples/shape';
import { DemoAvatarSizeComponent } from './examples/size';

@NgModule({
  imports: [
    CommonModule,
    NtMarkdownBlockModule,
    NtExampleModule,
    NtAvatarModule,
    RouterModule.forChild([
      { path: '', component: AvatarDocumentComponent }
    ])],
  declarations: [AvatarDocumentComponent, DemoAvatarBasicComponent, DemoAvatarSizeComponent, DemoAvatarShapeComponent],
})
export class AvatarDocumentModule { }
