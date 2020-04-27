import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtAutocompleteModule } from '@ng-tangram/components/autocomplete';
import { NtInputModule } from '@ng-tangram/components/input';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { AutocompleteDocumentComponent } from './autocomplete.component';
import { ExampleAutocompleteBasicComponent } from './examples/basic';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NtMarkdownModule,
    NtExampleModule,
    NtAutocompleteModule,
    NtInputModule,
    RouterModule.forChild([
      { path: '', component: AutocompleteDocumentComponent }
    ])
  ],
  declarations: [
    AutocompleteDocumentComponent,
    ExampleAutocompleteBasicComponent
  ]
})
export class AutocompleteDocumentModule { }
