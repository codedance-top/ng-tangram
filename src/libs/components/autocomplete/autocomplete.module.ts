import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtOptionModule } from '@ng-tangram/components/core';

import { NtAutocompleteOriginDirective } from './autocomplete-origin.directive';
import {
  NT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  NtAutocompleteTriggerDirective
} from './autocomplete-trigger.directive';
import { NtAutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    NtOptionModule
  ],
  exports: [
    NtAutocompleteComponent,
    NtAutocompleteTriggerDirective,
    NtAutocompleteOriginDirective,
    NtOptionModule
  ],
  declarations: [
    NtAutocompleteComponent,
    NtAutocompleteTriggerDirective,
    NtAutocompleteOriginDirective
  ],
  providers: [NT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class NtAutocompleteModule { }
