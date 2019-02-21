
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtDropdownModule } from '@ng-tangram/components/dropdown';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtExampleModule } from '@ng-tangram/example';

import { DropdownDocumentComponent } from './dropdown.component';
import { ExampleDropdownBasicComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtButtonModule,
    NtDropdownModule,
    RouterModule.forChild([
      { path: '', component: DropdownDocumentComponent }
    ])],
  declarations: [DropdownDocumentComponent, ExampleDropdownBasicComponent]
})
export class DropdownDocumentModule { }
