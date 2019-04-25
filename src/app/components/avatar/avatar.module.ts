
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtAvatarModule } from '@ng-tangram/components/avatar';

import { AvatarDocumentComponent } from './avatar.component';
import { DemoAvatarBasicComponent } from './examples/basic';
import { DemoAvatarSizeComponent } from './examples/size';
import { DemoAvatarShapeComponent } from './examples/shape';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtAvatarModule,
    RouterModule.forChild([
      { path: '', component: AvatarDocumentComponent }
    ])],
  declarations: [AvatarDocumentComponent, DemoAvatarBasicComponent, DemoAvatarSizeComponent, DemoAvatarShapeComponent],
})
export class AvatarDocumentModule { }
