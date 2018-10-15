
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtAvatarModule } from '@ng-tangram/components/avatar';

import { AvatarDocumentComponent } from './avatar.component';
import { DemoAvatarBasicComponent } from './demos/basic';
import { DemoAvatarSizeComponent } from './demos/size';
import { DemoAvatarShapeComponent } from './demos/shape';

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
